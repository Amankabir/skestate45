import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { typeVisual } from "@/constants/homeVisuals";
import type { PropertyTypeEntity } from "@/services/modules/property-types";
import { ArrowUpRight } from "lucide-react";

interface PropertyTypesProps {
  types: PropertyTypeEntity[];
  counts: Record<string, number>;
  covers?: Record<string, string>;
}

export function PropertyTypes({
  types,
  counts,
  covers = {},
}: PropertyTypesProps) {
  return (
    <section className="section-pad bg-warm-white" aria-labelledby="types-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Categories"
          title="Browse by type"
          description="Pick the format that fits — then filter live inventory in one click."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {types.map((type, i) => {
            const image = covers[type.id] || typeVisual(type.name);
            return (
              <FadeIn key={type.id} delay={i * 0.04}>
                <Link
                  href={`/properties?propertyTypeId=${type.id}`}
                  className="group relative block overflow-hidden rounded-2xl bg-pearl shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={type.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-pearl/90 text-navy opacity-0 transition group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-navy transition group-hover:text-gold">
                      {type.name}
                    </h3>
                    <p className="font-ui mt-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
                      {counts[type.id] ?? 0} listings
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
