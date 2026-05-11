"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FloatingCard({
  children,
  className = "",
  intensity = 12,
  glow = true,
  ...rest
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, (v) => -v * intensity), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, (v) => v * intensity), {
    stiffness: 220,
    damping: 22,
  });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`group relative ${className}`}
      {...rest}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-br from-primary/0 via-accent/0 to-secondary/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-primary/20 group-hover:via-accent/20 group-hover:to-secondary/20 group-hover:opacity-100" />
      )}
      {children}
    </motion.div>
  );
}
