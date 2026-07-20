"use client";

import { Compass, Eye, Heart, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, TextReveal } from "@/animations/Reveal";
import { GlowCard } from "@/components/ui/MagneticButton";

interface ValueItem {
  id: string;
  title: string;
  description: string;
}

interface AboutValuesProps {
  mission: string;
  vision: string;
  values: readonly ValueItem[];
}

const ICONS = [Sparkles, Compass, Eye, Heart];

export function AboutValues({ mission, vision, values }: AboutValuesProps) {
  return (
    <section className="section-pad bg-warm-white" aria-labelledby="values-heading">
      <div className="container-luxury">
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="on-dark h-full rounded-3xl bg-navy p-8 md:p-10">
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
                Mission
              </p>
              <TextReveal
                text={mission}
                as="p"
                className="mt-4 font-display text-2xl leading-snug text-pearl md:text-3xl"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-3xl border border-soft-gray bg-pearl p-8 md:p-10">
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
                Vision
              </p>
              <p className="font-display mt-4 text-2xl leading-snug text-navy md:text-3xl">
                {vision}
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Values"
            title="What guides every recommendation"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <FadeIn key={value.id} delay={i * 0.08}>
                  <GlowCard className="h-full rounded-2xl border border-soft-gray bg-pearl p-6 transition hover:-translate-y-1 hover:border-gold/35 hover:shadow-[var(--shadow-soft)]">
                    <div className="relative z-[1]">
                      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xl text-navy">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {value.description}
                      </p>
                    </div>
                  </GlowCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
