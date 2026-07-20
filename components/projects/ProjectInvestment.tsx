"use client";

import { TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { GlowCard } from "@/components/ui/MagneticButton";
import type { ProjectInvestmentMetric } from "@/types";

interface ProjectInvestmentProps {
  metrics: ProjectInvestmentMetric[];
}

export function ProjectInvestment({ metrics }: ProjectInvestmentProps) {
  return (
    <section
      className="section-pad relative overflow-hidden bg-ivory"
      aria-labelledby="project-invest-heading"
    >
      <div
        className="absolute right-0 top-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Investment Analysis"
          title="Numbers behind the address"
          description="ROI outlook, rental potential, and corridor trends for informed decisions."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <FadeIn key={m.id} delay={i * 0.08}>
              <GlowCard className="h-full rounded-2xl border border-soft-gray bg-pearl p-6 transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-soft)]">
                <div className="relative z-[1]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                      {m.label}
                    </p>
                    <TrendingUp className="h-4 w-4 text-emerald" />
                  </div>
                  <p className="font-display text-3xl text-navy md:text-4xl">
                    {m.value}
                  </p>
                  <p className="font-ui mt-1 text-xs text-emerald">{m.change}</p>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">
                    {m.description}
                  </p>
                </div>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
