"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { contact } from "@/lib/data";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({});

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const subject = encodeURIComponent(values.subject || "Portfolio enquiry");
    const body = encodeURIComponent(
      `From: ${values.name || ""} <${values.email || ""}>\n\n${values.message || ""}`
    );
    setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="luxe-card relative overflow-hidden p-5 sm:p-7 md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-[280px] w-[280px] rounded-full bg-primary/15 blur-[100px]"
      />
      <h2 className="h-display text-3xl text-ink md:text-4xl">{contact.form.title}</h2>
      <p className="mt-2 text-sm text-ink-soft">{contact.responseTime}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {contact.form.fields.map((f) => (
          <div
            key={f.name}
            className={f.type === "textarea" ? "md:col-span-2" : "md:col-span-1"}
          >
            <label
              htmlFor={f.name}
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted"
            >
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                rows={5}
                onChange={onChange}
                className="mt-2 w-full resize-none rounded-2xl border border-cream-200 bg-cream-50/60 px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                onChange={onChange}
                className="mt-2 w-full rounded-full border border-cream-200 bg-cream-50/60 px-5 py-3 text-sm text-ink placeholder:text-ink-subtle focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-muted">
          By sending you agree to a friendly, no-spam reply.
        </p>
        <button
          type="submit"
          data-cursor="cta"
          data-cursor-label="Send"
          disabled={status === "sending"}
          className="gold-button"
        >
          {status === "sent" ? (
            <>
              <Check className="h-4 w-4" /> Message routed
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> {contact.form.submitLabel}
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl border border-secondary/40 bg-secondary/15 px-4 py-3 text-sm text-ink"
          >
            {contact.form.successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
