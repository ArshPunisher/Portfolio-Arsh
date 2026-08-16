"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Layers,
  FolderKanban,
  CalendarDays,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { navigation, personal } from "@/lib/data";

const tabs = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Services", href: "/services", Icon: Layers },
  { label: "Work", href: "/projects", Icon: FolderKanban },
  { label: "Book", href: "/booking", Icon: CalendarDays },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the sheet so only the sheet scrolls
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[85svh] overflow-y-auto rounded-t-[28px] border-t border-cream-200 bg-cream-50 pb-[calc(var(--bottom-nav-h)+16px)] shadow-soft-xl lg:hidden"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-200 bg-cream-50/95 px-5 py-4 backdrop-blur-md">
              <div>
                <p className="font-display font-semibold text-2xl text-ink">
                  {personal.shortName}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">
                  {personal.role}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream-200 bg-white text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-5 pt-2">
              {navigation.primary.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between border-b border-cream-200 py-4 font-display font-semibold text-2xl ${
                      isActive ? "accent-text" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] font-body font-bold tracking-[0.2em] text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink-subtle" />
                  </Link>
                );
              })}
            </nav>

            <div className="px-5 pt-6">
              <Link href="/booking" className="gold-button w-full">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {navigation.footer.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-cream-200 bg-white/95 pb-safe-b backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {tabs.map(({ label, href, Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-[66px] flex-col items-center justify-center gap-1 ${
                    isActive ? "accent-text" : "text-ink-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bottom-nav-indicator"
                      className="absolute inset-x-4 top-0 h-[3px] rounded-b-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon
                    className="h-[22px] w-[22px]"
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                  <span className="text-[10px] font-bold tracking-[0.06em]">
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="More navigation"
              className={`flex h-[66px] w-full flex-col items-center justify-center gap-1 ${
                open ? "accent-text" : "text-ink-muted"
              }`}
            >
              <Menu className="h-[22px] w-[22px]" strokeWidth={2} />
              <span className="text-[10px] font-bold tracking-[0.06em]">More</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
