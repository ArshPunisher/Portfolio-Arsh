import navigation from "../../data/navigation.json";
import seo from "../../data/seo.json";

// Hand-tuned priorities: conversion pages outrank the reading pages.
const PRIORITY = {
  "/": 1.0,
  "/projects": 0.9,
  "/services": 0.9,
  "/about": 0.8,
  "/contact": 0.8,
  "/booking": 0.8,
  "/journey": 0.7,
  "/testimonials": 0.6,
  "/blog": 0.6,
};

const CHANGE_FREQ = {
  "/": "weekly",
  "/blog": "weekly",
  "/projects": "monthly",
};

export default function sitemap() {
  const base = seo.site.url;
  const now = new Date();

  return navigation.primary.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ[item.href] ?? "monthly",
    priority: PRIORITY[item.href] ?? 0.7,
  }));
}
