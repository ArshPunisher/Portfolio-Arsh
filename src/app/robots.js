import seo from "../../data/seo.json";

export default function robots() {
  return {
    rules: [
      // Everything is public and worth indexing; only Next's build artefacts are not.
      { userAgent: "*", allow: "/", disallow: ["/_next/static/chunks/"] },
    ],
    sitemap: `${seo.site.url}/sitemap.xml`,
    host: seo.site.url,
  };
}
