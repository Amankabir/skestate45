import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllAreas } from "@/lib/areas";
import { SITE } from "@/constants/site";
import { FadeIn } from "@/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Luxury Property Areas | Explore Locations",
  description:
    "Explore curated luxury real estate areas across Delhi NCR — Dwarka and more. Price trends, connectivity, and featured homes with SK Estate.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: `Property Areas | ${SITE.name}`,
    description:
      "Explore curated luxury real estate areas across Delhi NCR with SK Estate.",
    url: `${SITE.url}/areas`,
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=85";

export default function AreasIndexPage() {
  const areas = getAllAreas();

  return (
    <main id="main-content">
      <section className="on-dark relative flex min-h-[60svh] items-end overflow-hidden bg-navy-deep md:min-h-[70svh]">
        <Image
          src={HERO_IMAGE}
          alt="Luxury city skyline — explore SK Estate area guides"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/45 via-navy-deep/40 to-navy-deep/85" />
        <div className="container-luxury relative z-10 pb-14 pt-32 md:pb-20">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Locations
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl text-pearl md:text-6xl">
            Areas we know intimately
          </h1>
          <p className="mt-5 max-w-xl text-base text-pearl/75 md:text-lg">
            City guides built for buyers searching luxury apartments, investment
            opportunities, and a life well placed.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Browse"
            title="Curated area guides"
            description="Every guide covers lifestyle, pricing, connectivity, and featured homes."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 0.08}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={area.heroImage}
                    alt={`Properties in ${area.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-champagne">
                      {area.city}
                    </p>
                    <h2 className="font-display mt-1 text-3xl text-pearl">
                      {area.name}
                    </h2>
                    <p className="mt-2 text-sm text-pearl/70">{area.tagline}</p>
                    <p className="font-ui mt-4 text-xs text-pearl/80">
                      {area.propertyCount}+ properties · Avg {area.avgPrice}
                      /sq.ft
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
