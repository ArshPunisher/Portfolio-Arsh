"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/lib/data";

export default function ProjectsExperience() {
  const items = projects.items;
  const [active, setActive] = useState(0);

  const go = (dir) => {
    setActive((i) => (i + dir + items.length) % items.length);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const project = items[active];

  return (
    <section className="relative">
      <div className="container-luxe pt-24 pb-10 sm:pt-32 md:pt-40">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="h-eyebrow">{projects.eyebrow}</p>
            <h1 className="h-display mt-3 text-[2.4rem] text-ink sm:text-5xl md:text-6xl xl:text-7xl">
              {projects.title}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-soft md:text-lg">{projects.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              data-cursor="hover"
              aria-label="Previous project"
              className="grid h-12 w-12 place-items-center rounded-full border border-cream-200 bg-white/80 text-ink transition-colors hover:bg-white active:bg-cream-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              data-cursor="hover"
              aria-label="Next project"
              className="grid h-12 w-12 place-items-center rounded-full border border-cream-200 bg-white/80 text-ink transition-colors hover:bg-white active:bg-cream-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-1 font-mono text-xs font-bold text-ink-muted md:hidden">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="container-luxe">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="grid touch-pan-y grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12"
          >
            <div
              data-cursor="project"
              data-cursor-label="View"
              className="relative overflow-hidden rounded-[36px] lg:col-span-7"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 25%, ${project.color}DD 0%, ${project.accent}88 60%, ${project.color}22 100%)`,
                aspectRatio: "16 / 11",
              }}
            >
              <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display font-semibold text-[18vw] leading-none text-white/85 mix-blend-overlay md:text-[12vw]">
                  {project.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:inset-x-8 sm:top-8 sm:tracking-[0.22em]">
                <span className="truncate rounded-full border border-white/30 bg-white/15 px-3 py-1 backdrop-blur-md">
                  {project.category}
                </span>
                <span className="shrink-0">{project.year}</span>
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-white sm:inset-x-8 sm:bottom-8">
                <p className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl">
                  {project.name}
                </p>
                <span className="hidden rounded-full bg-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md md:inline-flex">
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="luxe-card relative overflow-hidden p-5 sm:p-7 md:p-9">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${project.color}, ${project.accent})`,
                  }}
                />
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">
                  <span>{project.year}</span>
                  <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                </div>
                <h2 className="h-display mt-4 text-3xl text-ink md:text-4xl">{project.name}</h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] accent-text">
                  {project.category}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                  {project.longDesc}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-cream-200 bg-white/80 px-3 py-1 text-[11px] text-ink-soft"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="cta"
                      data-cursor-label="Live"
                      className="gold-button"
                    >
                      <ExternalLink className="h-4 w-4" /> View live
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className="ghost-button"
                    >
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-1">
          {items.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Show ${p.name}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-11 place-items-center px-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-accent" : "w-5 bg-ink/25"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-between gap-5 rounded-3xl border border-cream-200 bg-white/70 p-5 backdrop-blur-md sm:p-6 md:flex-row md:items-center md:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream-100 shadow-inner3d">
              <Code2 className="h-5 w-5 accent-text" />
            </div>
            <div>
              <p className="font-display font-semibold text-xl text-ink md:text-2xl">
                See something you'd like in your stack?
              </p>
              <p className="text-sm text-ink-soft">Most builds start with a 30-minute call.</p>
            </div>
          </div>
          <Link
            href="/booking"
            data-cursor="cta"
            data-cursor-label="Book"
            className="gold-button shrink-0"
          >
            <Sparkles className="h-4 w-4" /> Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
