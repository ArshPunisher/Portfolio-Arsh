"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    dx: 0,
    dy: 0,
    label: "",
    variant: "default",
  });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isWideEnough = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(isFinePointer && isWideEnough);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf;
    const onMove = (e) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
    };

    const setVariant = (variant, label = "") => {
      stateRef.current.variant = variant;
      stateRef.current.label = label;
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? "1" : "0";
      }
      if (ringRef.current) {
        ringRef.current.dataset.variant = variant;
      }
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const variant = target.dataset.cursor || "hover";
        const label = target.dataset.cursorLabel || "";
        setVariant(variant, label);
      } else if (
        e.target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    const onLeave = () => setVariant("default");
    const onDown = () => ringRef.current?.classList.add("scale-90");
    const onUp = () => ringRef.current?.classList.remove("scale-90");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const tick = () => {
      const s = stateRef.current;
      s.dx += (s.x - s.dx) * 0.45;
      s.dy += (s.y - s.dy) * 0.45;
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry + 36}px, 0) translate(-50%, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        .arsh-ring {
          transition: width 280ms cubic-bezier(0.16, 1, 0.3, 1),
            height 280ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 280ms ease, background-color 280ms ease,
            transform 120ms ease;
        }
        .arsh-ring[data-variant="default"] {
          width: 36px;
          height: 36px;
          border-color: rgba(26, 15, 46, 0.7);
          border-width: 1.5px;
          background-color: rgba(26, 15, 46, 0.04);
        }
        .arsh-ring[data-variant="hover"] {
          width: 56px;
          height: 56px;
          border-color: rgba(63, 15, 135, 0.95);
          border-width: 1.5px;
          background-color: rgba(63, 15, 135, 0.12);
        }
        .arsh-ring[data-variant="project"] {
          width: 96px;
          height: 96px;
          border-color: rgba(63, 15, 135, 1);
          border-width: 2px;
          background-color: rgba(63, 15, 135, 0.18);
        }
        .arsh-ring[data-variant="drag"] {
          width: 72px;
          height: 72px;
          border-color: rgba(82, 59, 182, 0.95);
          border-width: 1.5px;
          background-color: rgba(82, 59, 182, 0.2);
        }
        .arsh-ring[data-variant="cta"] {
          width: 76px;
          height: 76px;
          border-color: rgba(145, 20, 20, 1);
          border-width: 2px;
          background-color: rgba(145, 20, 20, 0.2);
        }
      `}</style>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-ink shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-variant="default"
        className="arsh-ring pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border backdrop-blur-[2px]"
      />
      <span
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream opacity-0 transition-opacity duration-200"
      />
    </>
  );
}
