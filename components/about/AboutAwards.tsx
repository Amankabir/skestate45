"use client";

import { Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

interface AwardItem {
  id: string;
  year: string;
  title: string;
  org: string;
}

interface AboutAwardsProps {
  awards: readonly AwardItem[];
}

export function AboutAwards({ awards }: AboutAwardsProps) {
  return (
    <section className="section-pad bg-warm-white" aria-labelledby="awards-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Recognition"
          title="Awards & distinctions"
          description="Honours that reflect our clients' trust — not our marketing."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {awards.map((award, i) => (
            <FadeIn key={award.id} delay={i * 0.08}>
              <article className="flex items-start gap-5 rounded-2xl border border-soft-gray bg-pearl p-6 transition hover:border-gold/40 hover:shadow-[var(--shadow-soft)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-gold">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                    {award.year}
                  </p>
                  <h3 className="font-display mt-1 text-xl text-navy">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{award.org}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
