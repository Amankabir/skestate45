"use client";

import {
  School,
  Hospital,
  TrainFront,
  Plane,
  ShoppingBag,
  Clapperboard,
  UtensilsCrossed,
  Dumbbell,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { NearbyAmenity } from "@/types";

const CATEGORY_ICON: Record<string, typeof School> = {
  School: School,
  Hospital: Hospital,
  Metro: TrainFront,
  Airport: Plane,
  Mall: ShoppingBag,
  Cinema: Clapperboard,
  Restaurant: UtensilsCrossed,
  Gym: Dumbbell,
};

interface AreaAmenitiesProps {
  areaName: string;
  amenities: NearbyAmenity[];
}

export function AreaAmenities({ areaName, amenities }: AreaAmenitiesProps) {
  return (
    <section className="section-pad bg-ivory" aria-labelledby="amenities-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Amenities Nearby"
          title={`Everyday essentials around ${areaName}`}
          description="Schools, healthcare, transit, and leisure — mapped for convenience."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, i) => {
            const Icon = CATEGORY_ICON[item.category] ?? School;
            return (
              <FadeIn key={item.id} delay={i * 0.05} direction="none">
                <article className="group flex items-start gap-4 rounded-2xl border border-transparent bg-pearl p-4 transition duration-400 hover:border-gold/30 hover:shadow-[var(--shadow-soft)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-gold transition group-hover:bg-gold group-hover:text-navy-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-ui text-[0.6rem] uppercase tracking-[0.16em] text-gold">
                      {item.category}
                    </p>
                    <h3 className="font-display mt-0.5 text-lg text-navy">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                      {item.distance} · {item.travelTime}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
