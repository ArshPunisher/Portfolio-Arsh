import seo from "../../data/seo.json";

export default function manifest() {
  return {
    name: seo.site.name,
    short_name: seo.site.shortName,
    description: seo.default.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EB",
    theme_color: "#F5F1EB",
    icons: [
      { src: "/avatar/arsh-face-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/avatar/arsh-face-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
