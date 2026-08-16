"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingCard from "@/components/FloatingCard";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-[0.02]"
      />
      <div className="container-luxe">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <FloatingCard className="h-full" intensity={6}>
                <div
                  data-cursor="hover"
                  className="luxe-card relative flex h-full flex-col p-5 sm:p-7 transition-shadow duration-500 hover:shadow-soft-lg"
                >
                  <Quote className="absolute -top-3 left-6 h-8 w-8 rounded-full bg-white p-1.5 accent-text shadow-soft" />
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-accent stroke-accent" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">"{t.quote}"</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-cream-200 pt-5">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full font-display font-semibold text-base text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #7C3AED 0%, #DC2626 60%, #A78BFA 100%)",
                      }}
                    >
                      {t.avatar}
                    </span>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
