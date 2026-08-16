"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "./ExperienceProvider";

/**
 * Ambient pad synthesised with the Web Audio API — no audio file to ship,
 * license, or 404 on. A low sustained chord through a slow filter sweep,
 * which is all "ambient site sound" ever really is.
 */
const TARGET_GAIN = 0.055; // deliberately quiet — texture, not music
const FADE_IN = 2.5;
const FADE_OUT = 1.2;

// A minor 9th, voiced low and wide. Detuned pairs give it movement.
const VOICES = [
  { hz: 110.0, detune: -6, gain: 1.0 },
  { hz: 164.81, detune: 5, gain: 0.7 },
  { hz: 220.0, detune: -4, gain: 0.5 },
  { hz: 246.94, detune: 7, gain: 0.35 },
];

export default function AmbientSound() {
  const { sound } = useExperience();
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Nothing is built until the user actually asks for sound.
    if (!sound && !ctxRef.current) return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!ctxRef.current) {
      const ctx = new AudioCtx();

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // Rolls the top off so it sits behind the page rather than on top of it.
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      filter.Q.value = 0.7;
      filter.connect(master);

      const oscillators = VOICES.map(({ hz, detune, gain }) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = hz;
        osc.detune.value = detune;

        const g = ctx.createGain();
        g.gain.value = gain;

        osc.connect(g).connect(filter);
        osc.start();
        return osc;
      });

      // Two slow LFOs, deliberately non-matching periods so the texture
      // never audibly loops.
      const makeLfo = (rate, depth, target) => {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = rate;
        const amp = ctx.createGain();
        amp.gain.value = depth;
        lfo.connect(amp).connect(target);
        lfo.start();
        return lfo;
      };

      const lfos = [
        makeLfo(0.05, 190, filter.frequency), // filter drifts open and closed
        makeLfo(0.083, 3, oscillators[1].detune), // slight pitch shimmer
      ];

      ctxRef.current = ctx;
      nodesRef.current = { master, oscillators, lfos, filter };
    }

    const ctx = ctxRef.current;
    const { master } = nodesRef.current;
    const now = ctx.currentTime;

    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);

    if (sound) {
      // Browsers start contexts suspended until a gesture — the toggle is one.
      if (ctx.state === "suspended") ctx.resume();
      master.gain.linearRampToValueAtTime(TARGET_GAIN, now + FADE_IN);
    } else {
      master.gain.linearRampToValueAtTime(0, now + FADE_OUT);
    }
  }, [sound]);

  // Don't keep an oscillator bank running in a background tab.
  useEffect(() => {
    const onVisibility = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden && ctx.state === "running") ctx.suspend();
      else if (!document.hidden && sound && ctx.state === "suspended") ctx.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [sound]);

  useEffect(() => {
    return () => {
      const ctx = ctxRef.current;
      const nodes = nodesRef.current;
      if (nodes) {
        nodes.oscillators.forEach((o) => o.stop());
        nodes.lfos.forEach((l) => l.stop());
      }
      if (ctx && ctx.state !== "closed") ctx.close();
    };
  }, []);

  return null;
}
