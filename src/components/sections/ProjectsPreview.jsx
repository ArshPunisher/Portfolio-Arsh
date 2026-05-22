"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingCard from "@/components/FloatingCard";
import { projects } from "@/lib/data";

export default function ProjectsPreview({ limit = 4 }) {
  const items = projects.items.slice(0, limit);
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={projects.eyebrow}
            title={projects.title}
            subtitle={projects.subtitle}
          />
          <Link
            href="/projects"
            data-cursor="project"
            data-cursor-label="Explore"
            className="ghost-button shrink-0"
          >
            Open the full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <FloatingCard className="h-full" intensity={9}>
                <article
                  data-cursor="project"
                  data-cursor-label="View"
                  className="luxe-card group flex h-full flex-col overflow-hidden p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
                >
                  <div
                    className="relative h-48 shrink-0 overflow-hidden rounded-2xl"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 20%, ${p.color}CC 0%, ${p.accent}66 50%, #F5F1EB 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display font-semibold text-6xl text-white/85 mix-blend-overlay">
                        {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-white/85">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </div>
                  </div>

                  <h3 className="h-display mt-6 text-2xl text-ink md:text-3xl">{p.name}</h3>
                  <p className="mt-2 min-h-[3em] text-sm text-ink-soft">{p.shortDesc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-cream-200 bg-cream-50 px-3 py-1 text-[11px] text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3 border-t border-cream-200 pt-5">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:accent-text"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                    {p.code && (
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink hover:accent-text"
                      >
                        <Github className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                    <Link
                      href="/projects"
                      data-cursor="project"
                      data-cursor-label="Explore"
                      className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink-muted hover:accent-text"
                    >
                      View case study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
