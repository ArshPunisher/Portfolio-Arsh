"use client";

import { motion } from "framer-motion";

export default function MarqueeStrip({ items, speed = 28, separator = "✦" }) {
  const list = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-cream-200/70 bg-white/40 py-4 sm:py-6">
      <motion.div
        className="flex w-max items-center gap-6 whitespace-nowrap sm:gap-10"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-6 font-display font-semibold text-xl text-ink-soft sm:gap-10 sm:text-2xl">
            {item}
            <span className="accent-text">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
