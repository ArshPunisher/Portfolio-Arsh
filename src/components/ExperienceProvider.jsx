"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ExperienceContext = createContext(null);

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used inside ExperienceProvider");
  return ctx;
}

export function ExperienceProvider({ children }) {
  const [accent, setAccent] = useState("red");
  const [intensity, setIntensity] = useState("medium");
  const [sound, setSound] = useState(false);
  const [resetCameraToken, setResetCameraToken] = useState(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-accent", accent);
    }
  }, [accent]);

  const cycleIntensity = useCallback(() => {
    setIntensity((prev) => (prev === "low" ? "medium" : prev === "medium" ? "high" : "low"));
  }, []);

  const toggleSound = useCallback(() => setSound((s) => !s), []);
  const resetCamera = useCallback(() => setResetCameraToken((n) => n + 1), []);

  return (
    <ExperienceContext.Provider
      value={{
        accent,
        setAccent,
        intensity,
        setIntensity,
        cycleIntensity,
        sound,
        setSound,
        toggleSound,
        resetCamera,
        resetCameraToken,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}
