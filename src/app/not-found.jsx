import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70svh] place-items-center px-1 pb-16 pt-24 sm:pt-32">
      <div className="container-luxe text-center">
        <p className="h-eyebrow">404</p>
        <h1 className="h-display mt-3 text-[2.4rem] text-ink sm:text-6xl md:text-8xl">
          This page took a <em className="accent-text not-italic">wrong turn.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base">
          The page you're after doesn't exist — or it's been quietly retired. Either way, let's get you back to solid ground.
        </p>
        <Link href="/" data-cursor="cta" data-cursor-label="Home" className="gold-button mx-auto mt-10 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
