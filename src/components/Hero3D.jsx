"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Circle } from "lucide-react";
import FloatingCard from "./FloatingCard";
import { personal, cta } from "@/lib/data";

const codeLines = [
  [
    { c: "violet", t: "import" },
    { c: "ink", t: " { motion } " },
    { c: "violet", t: "from" },
    { c: "red", t: " 'framer-motion'" },
  ],
  [
    { c: "violet", t: "import" },
    { c: "ink", t: " { Hero, Stack, CTA } " },
    { c: "violet", t: "from" },
    { c: "red", t: " '@/components'" },
  ],
  [],
  [
    { c: "violet", t: "export default function" },
    { c: "yellow", t: " Portfolio" },
    { c: "ink", t: "() {" },
  ],
  [
    { c: "ink", t: "  " },
    { c: "violet", t: "return" },
    { c: "ink", t: " (" },
  ],
  [
    { c: "ink", t: "    <" },
    { c: "red", t: "motion.main" },
    { c: "ink", t: " " },
    { c: "yellow", t: "initial" },
    { c: "ink", t: "={{ " },
    { c: "yellow", t: "opacity" },
    { c: "ink", t: ": 0 }}>" },
  ],
  [
    { c: "ink", t: "      <" },
    { c: "red", t: "Hero" },
    { c: "ink", t: " " },
    { c: "yellow", t: "name" },
    { c: "ink", t: "=" },
    { c: "red", t: '"Arsh"' },
    { c: "ink", t: " />" },
  ],
  [
    { c: "ink", t: "      <" },
    { c: "red", t: "Stack" },
    { c: "ink", t: " " },
    { c: "yellow", t: "speed" },
    { c: "ink", t: "={" },
    { c: "violet", t: "9000" },
    { c: "ink", t: "} />" },
  ],
  [
    { c: "ink", t: "      <" },
    { c: "red", t: "CTA" },
    { c: "ink", t: " " },
    { c: "yellow", t: "label" },
    { c: "ink", t: "=" },
    { c: "red", t: '"Let\'s build"' },
    { c: "ink", t: " />" },
  ],
  [
    { c: "ink", t: "    </" },
    { c: "red", t: "motion.main" },
    { c: "ink", t: ">" },
  ],
  [{ c: "ink", t: "  )" }],
  [{ c: "ink", t: "}" }],
  [],
  [{ c: "muted", t: "// shipped at 60fps · always." }],
];

const colorMap = {
  violet: "text-primary",
  red: "text-accent",
  yellow: "text-amber-500",
  ink: "text-ink-soft",
  muted: "text-ink-muted italic",
};

export default function Hero3D() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % personal.headlines.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32 md:pb-32 md:pt-40 lg:min-h-[100svh]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px] md:h-[680px] md:w-[680px] md:blur-[140px]" />
        <div className="absolute right-[10%] top-[15%] h-[220px] w-[220px] rounded-full bg-secondary/30 blur-[100px] md:h-[320px] md:w-[320px] md:blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] h-[220px] w-[220px] rounded-full bg-accent/20 blur-[100px] md:h-[320px] md:w-[320px] md:blur-[120px]" />
      </div>

      <div className="container-luxe grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="min-w-0 lg:col-span-6 xl:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-cream-200 bg-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted shadow-soft backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.28em]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 accent-text" />
            <span className="truncate">Available for select 2026 projects</span>
          </div>

          <h1 className="h-display mt-6 text-[2.6rem] text-ink sm:mt-7 sm:text-6xl md:text-7xl xl:text-[88px]">
            <span className="block overflow-hidden">
              <motion.span
                key={headlineIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="block italic primary-text"
              >
                {personal.headlines[headlineIndex]}
              </motion.span>
            </span>
            <span className="mt-2 block text-ink">
              I build the web,
              <br className="hidden md:block" /> end to end.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft text-pretty sm:mt-7 sm:text-base md:text-lg">
            {personal.intro}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={cta.hero.primary.href}
              data-cursor="cta"
              data-cursor-label="Book"
              className="gold-button"
            >
              {cta.hero.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={cta.hero.secondary.href}
              data-cursor="hover"
              className="ghost-button"
            >
              {cta.hero.secondary.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-5 sm:mt-14 sm:gap-6 sm:grid-cols-4">
            {personal.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
              >
                <dd className="font-display text-4xl font-bold leading-none text-ink sm:text-[42px]">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-ink-muted sm:tracking-[0.18em]">
                  {s.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="min-w-0 lg:col-span-6 xl:col-span-6"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative mx-auto w-full max-w-[600px]">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[44px] bg-gradient-to-br from-primary/30 via-cream-100 to-accent/15 blur-2xl"
            />

            <FloatingCard intensity={6} className="rounded-[28px]">
              <div
                data-cursor="hover"
                className="relative overflow-hidden rounded-[28px] border border-cream-200 bg-white/85 shadow-soft-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-3 border-b border-cream-200/80 bg-cream-50/70 px-4 py-3 sm:px-5">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-accent" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-primary-300" />
                  </div>
                  <p className="truncate font-mono text-[10px] font-semibold text-ink-muted sm:text-[11px]">
                    portfolio.jsx — arsh.dev
                  </p>
                  <span className="shrink-0 font-mono text-[10px] font-semibold text-ink-subtle sm:text-[11px]">
                    main
                  </span>
                </div>

                <div className="grid grid-cols-[36px_minmax(0,1fr)] font-mono text-[11px] leading-6 sm:grid-cols-[44px_minmax(0,1fr)] sm:text-[13px]">
                  <div className="border-r border-cream-200/70 bg-cream-50/40 py-5 text-right">
                    {codeLines.map((_, i) => (
                      <div key={i} className="px-2 text-ink-subtle sm:px-3">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                  {/* Long lines scroll inside the card instead of widening the page */}
                  <div className="overflow-x-auto overscroll-x-contain py-5 pl-3 pr-4 sm:pl-4 sm:pr-5">
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                        className="whitespace-pre"
                      >
                        {line.length === 0 ? (
                          <>&nbsp;</>
                        ) : (
                          line.map((token, j) => (
                            <span key={j} className={colorMap[token.c]}>
                              {token.t}
                            </span>
                          ))
                        )}
                      </motion.div>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-cream-200/70 bg-cream-50/70 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink-muted sm:px-5 sm:text-[10px] sm:tracking-[0.22em]">
                  <span className="flex min-w-0 items-center gap-2">
                    <Circle className="h-2 w-2 shrink-0 fill-secondary stroke-none" />
                    <span className="truncate">UTF-8 · TS JSX · LF</span>
                  </span>
                  <span className="shrink-0">Lighthouse 98</span>
                </div>
              </div>
            </FloatingCard>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -bottom-6 left-6 hidden rounded-2xl border border-cream-200 bg-white/95 px-4 py-3 shadow-soft backdrop-blur-md lg:block"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink-muted">
                Now playing
              </p>
              <p className="text-sm font-semibold text-ink">React · Next · Tailwind</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-4 top-10 hidden rounded-2xl border border-cream-200 bg-white/95 px-4 py-3 shadow-soft backdrop-blur-md lg:block"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink-muted">
                Stack
              </p>
              <p className="text-sm font-semibold text-ink">Node · Postgres · AWS</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="container-luxe mt-16 hidden items-center justify-between text-xs font-bold uppercase tracking-[0.28em] text-ink-muted md:flex"
      >
        <span>Scroll to wander →</span>
        <span className="hidden md:inline">Right-click anywhere for the secret menu</span>
      </motion.div>
    </section>
  );
}
