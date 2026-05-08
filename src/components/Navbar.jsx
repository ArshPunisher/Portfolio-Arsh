"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, personal } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-luxe ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container-luxe">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ease-luxe sm:px-5 ${
              scrolled
                ? "border-cream-200 bg-white/85 shadow-soft backdrop-blur-xl"
                : "border-transparent bg-white/40 backdrop-blur-md"
            }`}
          >
            <Link
              href="/"
              data-cursor="hover"
              className="flex items-center gap-2 pl-1 pr-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream font-display text-base">
                A
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-lg text-ink">{personal.shortName}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  Full-Stack · 3D Web
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.primary.slice(0, 7).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor="hover"
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-cream-200/80"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/booking"
                data-cursor="cta"
                data-cursor-label="Book"
                className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-cream transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                aria-label="Open menu"
                onClick={() => setOpen((v) => !v)}
                data-cursor="hover"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-200 bg-white/80 text-ink lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-luxe flex h-full flex-col justify-center pt-20">
              <nav className="flex flex-col gap-1">
                {navigation.primary.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-cream-200 py-4 font-display text-3xl text-ink"
                    >
                      <span className="mr-3 text-xs accent-text">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link
                href="/booking"
                className="gold-button mt-8 self-start"
                onClick={() => setOpen(false)}
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
