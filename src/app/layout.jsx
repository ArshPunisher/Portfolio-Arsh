import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ContextMenu from "@/components/ContextMenu";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientSound from "@/components/AmbientSound";
import { ExperienceProvider } from "@/components/ExperienceProvider";
import { buildMetadata } from "@/lib/seo";
import { personal } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = buildMetadata("home");

export const viewport = {
  themeColor: "#F5F1EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.role,
    url: personal.siteUrl,
    email: `mailto:${personal.email}`,
    sameAs: [
      personal.social.github,
      personal.social.linkedin,
      personal.social.twitter,
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "AWS",
      "Performance Engineering",
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="relative bg-cream text-ink antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ExperienceProvider>
          <CustomCursor />
          <ContextMenu />
          <ScrollProgress />
          <AmbientSound />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-soft-radial"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-luxury-fade opacity-70"
          />
        </ExperienceProvider>
      </body>
    </html>
  );
}
