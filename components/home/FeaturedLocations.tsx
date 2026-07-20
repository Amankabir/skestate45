import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { AreaCard } from "@/components/home/AreaCard";
import type { Area } from "@/services/modules/areas";

interface FeaturedLocationsProps {
  areas: Area[];
  counts: Record<string, number>;
  covers?: Record<string, string>;
}

export function FeaturedLocations({
  areas,
  counts,
  covers = {},
}: FeaturedLocationsProps) {
  const top = [...areas]
    .map((a) => ({ ...a, count: counts[a.id] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <section
      className="relative overflow-hidden bg-ivory pt-[var(--section)] pb-10 md:pb-12"
      aria-labelledby="areas-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="container-luxury">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Micro-markets"
            title="Popular areas"
            description="Localities with the most available commercial spaces right now."
          />
          <Link
            href="/areas"
            className="font-ui inline-flex shrink-0 items-center self-start rounded-full border border-navy/15 bg-pearl px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-navy transition hover:border-gold hover:text-gold sm:self-auto"
          >
            View all areas →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((area, i) => (
            <FadeIn key={area.id} delay={i * 0.05}>
              <AreaCard
                id={area.id}
                name={area.name}
                count={area.count}
                cover={covers[area.id]}
                fallbackIndex={i}
                badge={i === 0 ? "Most listed" : undefined}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
