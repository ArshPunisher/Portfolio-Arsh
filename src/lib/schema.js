import seo from "@data/seo.json";
import { personal, faq, services, experience, navigation } from "@/lib/data";

const SITE = seo.site.url;

/** Person — the entity the whole site is about. */
export function personSchema() {
  const [current] = experience.items;

  return {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: personal.name,
    alternateName: personal.shortName,
    jobTitle: personal.role,
    description: personal.intro,
    url: SITE,
    image: `${SITE}/avatar/arsh-avatar-512.png`,
    email: `mailto:${personal.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location,
      addressCountry: "IN",
    },
    ...(current && {
      worksFor: { "@type": "Organization", name: current.company },
    }),
    alumniOf: experience.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.subtitle.split(" · ")[0] || e.title,
    })),
    knowsAbout: services.items.flatMap((s) => s.stack).filter((v, i, a) => a.indexOf(v) === i),
    sameAs: [
      personal.social.github,
      personal.social.linkedin,
      personal.social.twitter,
    ],
  };
}

/** WebSite — ties the domain to the person and names the publisher. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: seo.site.name,
    description: seo.default.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE}/#person` },
    copyrightHolder: { "@id": `${SITE}/#person` },
  };
}

/** ProfessionalService — makes the services offering machine-readable. */
export function servicesSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE}/#service`,
    name: seo.site.name,
    url: `${SITE}/services`,
    image: `${SITE}/og-services.png`,
    description: services.subtitle,
    provider: { "@id": `${SITE}/#person` },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi", "Punjabi"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web engineering services",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
}

/** FAQPage — eligible for FAQ rich results on pages that render the FAQ block. */
export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** BreadcrumbList — gives Google the path shown under the result title. */
export function breadcrumbSchema(pageKey) {
  const match = navigation.primary.find(
    (n) => n.href === (pageKey === "home" ? "/" : `/${pageKey}`)
  );
  const crumbs = [{ name: "Home", url: SITE }];
  if (pageKey !== "home" && match) {
    crumbs.push({ name: match.label, url: `${SITE}${match.href}` });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/**
 * One @graph per page beats several loose <script> blocks: nodes can reference
 * each other by @id, so Google resolves them into a single connected entity.
 */
export function buildGraph(pageKey, { faq: withFaq = false, extra = [] } = {}) {
  const nodes = [
    personSchema(),
    websiteSchema(),
    breadcrumbSchema(pageKey),
    ...extra,
  ];
  if (withFaq) nodes.push(faqSchema());

  return { "@context": "https://schema.org", "@graph": nodes };
}
