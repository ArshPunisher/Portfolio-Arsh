import Hero3D from "@/components/Hero3D";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingCTA from "@/components/sections/BookingCTA";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import StatsBand from "@/components/sections/StatsBand";
import SkillsSection from "@/components/sections/SkillsSection";
import PrinciplesSection from "@/components/sections/PrinciplesSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import FAQSection from "@/components/sections/FAQSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <MarqueeStrip
        items={[
          "React",
          "Next.js",
          "Node",
          "Three.js",
          "PostgreSQL",
          "MongoDB",
          "TypeScript",
          "Tailwind",
          "GraphQL",
          "AWS",
        ]}
      />
      <StatsBand />
      <ServicesSection withProcess limit={6} />
      <ProjectsPreview limit={4} />
      <SkillsSection />
      <PrinciplesSection />
      <TestimonialsSection />
      <BookingCTA />
      <FAQSection />
    </>
  );
}
