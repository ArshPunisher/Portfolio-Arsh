"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { cta } from "@/lib/data";

export default function BookingCTA({ variant = "after-testimonials" }) {
  const config = cta.afterTestimonials;

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-ink p-6 text-cream shadow-soft-xl sm:rounded-[36px] sm:p-10 md:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-accent/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay"
          />

          <div className="relative grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <span className="h-eyebrow text-cream/75">{config.eyebrow}</span>
              <h2 className="h-display mt-3 text-[2rem] text-cream text-balance sm:text-4xl md:text-6xl">
                {config.title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/85 text-pretty sm:mt-5 sm:text-base">{config.body}</p>
            </div>
            <div className="flex flex-col items-stretch gap-3 md:col-span-4 md:items-end">
              <Link
                href={config.primary.href}
                data-cursor="cta"
                data-cursor-label="Book"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="h-4 w-4" />
                {config.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={config.secondary.href}
                data-cursor="hover"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-cream/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <MessageCircle className="h-4 w-4" />
                {config.secondary.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
