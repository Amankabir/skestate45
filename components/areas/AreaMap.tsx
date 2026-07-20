"use client";

import { Clock, Car, TrainFront, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { TravelTime } from "@/types";

interface AreaMapProps {
  areaName: string;
  mapQuery: string;
  travelTimes: TravelTime[];
}

const MODE_ICON = {
  Metro: TrainFront,
  Car: Car,
  "Car / Express": Car,
  Expressway: Navigation,
};

export function AreaMap({ areaName, mapQuery, travelTimes }: AreaMapProps) {
  return (
    <section
      className="section-pad bg-pearl"
      aria-labelledby="map-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Location"
          title={`Find your place in ${areaName}`}
          description="Explore the map and typical travel times to key NCR destinations."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <FadeIn direction="right">
            <div className="overflow-hidden rounded-2xl border border-soft-gray shadow-[var(--shadow-soft)]">
              <iframe
                title={`Map of ${areaName}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="h-[360px] w-full md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {travelTimes.map((item, i) => {
              const Icon =
                MODE_ICON[item.mode as keyof typeof MODE_ICON] ?? Clock;
              return (
                <FadeIn key={item.id} delay={0.1 + i * 0.08} direction="left">
                  <article className="flex items-center gap-4 rounded-2xl border border-soft-gray bg-warm-white p-4 transition hover:border-gold/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display truncate text-lg text-navy">
                        {item.destination}
                      </h3>
                      <p className="font-ui text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
                        {item.mode}
                      </p>
                    </div>
                    <p className="font-display shrink-0 text-xl text-gold">
                      {item.time}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
