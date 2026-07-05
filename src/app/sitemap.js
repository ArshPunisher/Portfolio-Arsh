import navigation from "../../data/navigation.json";
import seo from "../../data/seo.json";

export default function sitemap() {
  const base = seo.site.url;
  const now = new Date();

  return navigation.primary.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
