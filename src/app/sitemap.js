import navigation from "../../data/navigation.json";
import seo from "../../data/seo.json";
import blog from "../../data/blog.json";

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

  const pages = navigation.primary.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ[item.href] ?? "monthly",
    priority: PRIORITY[item.href] ?? 0.7,
  }));

  // Only posts with body content exist as routes, so only those belong here.
  const posts = blog.posts
    .filter((p) => Array.isArray(p.body) && p.body.length > 0)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  return [...pages, ...posts];
}
