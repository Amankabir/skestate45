"use client";

import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

interface ProjectMapProps {
  projectName: string;
  mapQuery: string;
  landmarks: { name: string; type: string; distance: string }[];
}

export function ProjectMap({
  projectName,
  mapQuery,
  landmarks,
}: ProjectMapProps) {
  return (
    <section className="section-pad bg-warm-white" aria-labelledby="map-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="On the Map"
          title={`Find ${projectName}`}
          description="Explore nearby landmarks and plan your commute."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
          <FadeIn direction="right">
            <div className="overflow-hidden rounded-2xl border border-soft-gray shadow-[var(--shadow-soft)]">
              <iframe
                title={`Map of ${projectName}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="h-[360px] w-full md:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {landmarks.map((item, i) => (
              <FadeIn key={item.name} delay={0.08 + i * 0.06} direction="left">
                <article className="flex items-center gap-3 rounded-2xl border border-soft-gray bg-pearl p-4 transition hover:border-gold/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                      {item.type}
                    </p>
                    <h3 className="font-display truncate text-base text-navy">
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-ui shrink-0 text-xs text-text-muted">
                    {item.distance}
                  </span>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
