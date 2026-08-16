import ProjectsExperience from "@/components/sections/ProjectsExperience";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import BookingCTA from "@/components/sections/BookingCTA";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { buildGraph } from "@/lib/schema";

export const metadata = buildMetadata("projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={buildGraph("projects")} />
      <ProjectsExperience />
      <section className="relative py-10 sm:py-12 md:py-16">
        <div className="container-luxe">
          <p className="h-eyebrow">Prefer the flat list?</p>
          <h2 className="h-display mt-3 max-w-3xl text-[2rem] text-ink sm:text-4xl md:text-5xl">
            Same projects, classic gallery.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Not in the mood to scroll-orbit through 3D space? Here's the same body of work as a familiar grid you can scan in seconds.
          </p>
        </div>
      </section>
      <ProjectsPreview limit={6} />
      <BookingCTA />
    </>
  );
}
