"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faq } from "@/lib/data";

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={faq.title}
            subtitle={faq.subtitle}
          />
        </div>
        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  data-cursor="hover"
                  className="luxe-card overflow-hidden transition-shadow duration-300 hover:shadow-soft-lg"
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-display font-semibold text-lg text-ink md:text-xl">{item.q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream-200 bg-white">
                      {isOpen ? (
                        <Minus className="h-4 w-4 accent-text" />
                      ) : (
                        <Plus className="h-4 w-4 accent-text" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6"
                      >
                        <p className="border-t border-cream-200 pb-6 pt-4 text-sm text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
