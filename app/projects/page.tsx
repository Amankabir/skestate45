import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProjectDetails } from "@/lib/projects";
import { SITE } from "@/constants/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

export const metadata: Metadata = {
  title: "Luxury Real Estate Projects | New Launches",
  description:
    "Explore luxury residential projects including Godrej South Estate and curated launches across India with SK Estate advisory.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${SITE.name}`,
    description:
      "Luxury residential projects and new launches curated by SK Estate.",
    url: `${SITE.url}/projects`,
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=85";

export default function ProjectsIndexPage() {
  const projects = getAllProjectDetails();

  return (
    <main id="main-content">
      <section className="on-dark relative flex min-h-[60svh] items-end overflow-hidden bg-navy-deep md:min-h-[70svh]">
        <Image
          src={HERO_IMAGE}
          alt="Luxury residential towers — SK Estate project launches"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/45 via-navy-deep/40 to-navy-deep/85" />
        <div className="container-luxury relative z-10 pb-14 pt-32 md:pb-20">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Projects
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl text-pearl md:text-6xl">
            Landmark residences, carefully chosen
          </h1>
          <p className="mt-5 max-w-xl text-base text-pearl/75 md:text-lg">
            Invitation-only and featured launches from India&apos;s most
            respected developers.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Featured Launches"
            title="Explore every project"
            description="Pricing, floor plans, amenities, and site visits — all in one place."
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {projects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <span className="font-ui rounded-full bg-pearl/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-pearl backdrop-blur-sm">
                      {project.status}
                    </span>
                    <h2 className="font-display mt-3 text-2xl text-pearl md:text-3xl">
                      {project.name}
                    </h2>
                    <p className="mt-1 text-sm text-pearl/70">
                      {project.builder} · {project.location}
                    </p>
                    <p className="font-display mt-3 text-xl text-champagne">
                      From {project.startingPrice}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
