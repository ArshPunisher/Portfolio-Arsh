"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "./ExperienceProvider";

const AUDIO_SRC = "/audio/ambient.m4a";
const TARGET_VOLUME = 0.35;
const FADE_IN_MS = 2200;
const FADE_OUT_MS = 900;

export default function AmbientSound() {
  const { sound } = useExperience();
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Nothing is fetched until the user actually asks for sound, so visitors
    // who never touch the toggle pay nothing for it.
    if (!sound && !audioRef.current) return;

    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const cancelFade = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const fadeTo = (target, duration, onDone) => {
      cancelFade();
      const start = performance.now();
      const from = audio.volume;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-in-out so the fade doesn't announce itself
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        audio.volume = Math.max(0, Math.min(1, from + (target - from) * eased));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else {
          rafRef.current = null;
          onDone?.();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    if (sound) {
      const played = audio.play();
      played?.catch(() => {
        /* autoplay blocked — the toggle is a gesture, so this is rare */
      });
      fadeTo(TARGET_VOLUME, FADE_IN_MS);
    } else {
      fadeTo(0, FADE_OUT_MS, () => audio.pause());
    }

    return cancelFade;
  }, [sound]);

  // Don't keep playing into a tab nobody is looking at.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (sound) audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [sound]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  return null;
}
