"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "./ExperienceProvider";

const AUDIO_SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.45;
const FADE_IN_MS = 1200;
const FADE_OUT_MS = 700;

export default function AmbientSound() {
  const { sound } = useExperience();
  const audioRef = useRef(null);
  const fadeRafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only reach for the file once sound is actually switched on — creating it
    // eagerly fires a network request (and a console 404) on every page load.
    if (!sound && !audioRef.current) return;

    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.preload = "none";
      audio.volume = 0;
      audio.crossOrigin = "anonymous";
      audio.addEventListener("error", () => {
        /* track missing or undecodable — stay silent rather than throwing */
      });
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const cancelFade = () => {
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
    };

    const fadeTo = (target, duration, onDone) => {
      cancelFade();
      const start = performance.now();
      const from = audio.volume;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        audio.volume = from + (target - from) * eased;
        if (t < 1) {
          fadeRafRef.current = requestAnimationFrame(tick);
        } else {
          fadeRafRef.current = null;
          if (onDone) onDone();
        }
      };
      fadeRafRef.current = requestAnimationFrame(tick);
    };

    if (sound) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* autoplay blocked — user gesture covered by toggle, but keep silent */
        });
      }
      fadeTo(TARGET_VOLUME, FADE_IN_MS);
    } else {
      fadeTo(0, FADE_OUT_MS, () => {
        audio.pause();
      });
    }

    return cancelFade;
  }, [sound]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  return null;
}
