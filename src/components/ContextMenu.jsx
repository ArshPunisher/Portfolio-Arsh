"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { contextMenu } from "@/lib/data";
import { useExperience } from "./ExperienceProvider";

const PADDING = 12;
const MENU_WIDTH = 280;

export default function ContextMenu() {
  const router = useRouter();
  const { setAccent, accent, intensity, cycleIntensity, sound, toggleSound } = useExperience();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = origin.x;
    let y = origin.y;

    if (x + rect.width > vw - PADDING) {
      x = Math.max(PADDING, vw - rect.width - PADDING);
    }
    if (y + rect.height > vh - PADDING) {
      const flippedY = origin.y - rect.height;
      y = flippedY > PADDING ? flippedY : Math.max(PADDING, vh - rect.height - PADDING);
    }
    x = Math.max(PADDING, x);
    y = Math.max(PADDING, y);

    if (x !== pos.x || y !== pos.y) {
      setPos({ x, y });
    }
  }, [open, origin]);

  useEffect(() => {
    const onContext = (e) => {
      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - MENU_WIDTH - PADDING);
      const y = e.clientY;
      setOrigin({ x, y });
      setPos({ x, y });
      setOpen(true);
    };
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handle = (item) => {
    switch (item.action) {
      case "navigate":
        router.push(item.value);
        break;
      case "intensity":
        cycleIntensity();
        break;
      case "sound":
        toggleSound();
        break;
      case "scroll-top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "accent":
        setAccent(item.value);
        break;
      default:
        break;
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="menu"
          aria-label="Custom context menu"
          initial={{ opacity: 0, scale: 0.92, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -4 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ left: pos.x, top: pos.y, maxHeight: `calc(100vh - ${PADDING * 2}px)` }}
          className="fixed z-[10000] w-[280px] origin-top-left overflow-y-auto overflow-x-hidden rounded-2xl border border-cream-200 bg-white/95 p-2 shadow-soft-xl backdrop-blur-xl overscroll-contain"
        >
          <div className="px-3 pb-2 pt-1">
            <p className="h-eyebrow">Arsh · Quick Actions</p>
          </div>
          {contextMenu.groups.map((group, gi) => (
            <div key={group.id} className={gi > 0 ? "mt-1 border-t border-cream-200/70 pt-1" : ""}>
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
                {group.label}
              </p>
              {group.items.map((item) => {
                const isActive =
                  (item.action === "accent" && accent === item.value) ||
                  (item.action === "intensity" && intensity) ||
                  (item.action === "sound" && sound);
                return (
                  <button
                    key={item.id}
                    onClick={() => handle(item)}
                    data-cursor="hover"
                    className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-cream-100"
                  >
                    <span className="flex items-center gap-3">
                      {item.color && (
                        <span
                          className="h-3 w-3 rounded-full ring-2 ring-white"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                      <span className="font-semibold">{item.label}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      {item.action === "intensity" && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                          {intensity}
                        </span>
                      )}
                      {item.action === "sound" && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                          {sound ? "on" : "off"}
                        </span>
                      )}
                      {item.action === "accent" && accent === item.value && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] accent-text">
                          active
                        </span>
                      )}
                      {item.shortcut && (
                        <kbd className="rounded-md bg-cream-200/70 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">
                          {item.shortcut}
                        </kbd>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
          <p className="mt-2 border-t border-cream-200/70 px-3 pb-1 pt-2 text-[10px] text-ink-subtle">
            Esc to close · Right-click anywhere to reopen
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
