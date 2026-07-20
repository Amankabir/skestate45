"use client";

import { TrendingUp, Building2, Landmark, Sparkles } from "lucide-react";
import { FadeIn, TextReveal } from "@/animations/Reveal";
import type { InvestmentPoint } from "@/types";

const ICONS = [TrendingUp, Building2, Landmark, Sparkles];

interface AreaInvestmentProps {
  areaName: string;
  intro: string;
  points: InvestmentPoint[];
}

export function AreaInvestment({
  areaName,
  intro,
  points,
}: AreaInvestmentProps) {
  return (
    <section
      className="on-dark section-pad relative overflow-hidden bg-navy"
      aria-labelledby="investment-area-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,151,90,0.14),transparent_50%)]"
        aria-hidden
      />
      <div className="noise-overlay opacity-[0.04]" aria-hidden />

      <div className="container-luxury relative z-[2]">
        <div className="max-w-2xl">
          <p className="font-ui mb-4 text-xs uppercase tracking-[0.28em] text-champagne">
            Investment Opportunities
          </p>
          <TextReveal
            text={`Why invest in ${areaName}`}
            as="h2"
            className="text-4xl text-pearl md:text-5xl"
          />
          <FadeIn delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-pearl/70 md:text-lg">
              {intro}
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {points.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <FadeIn
                key={point.id}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "up" : "down"}
              >
                <article className="group flex gap-5 rounded-2xl border border-pearl/10 bg-pearl/[0.05] p-6 backdrop-blur-sm transition duration-500 hover:bg-pearl/[0.09] md:p-8">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition duration-500 group-hover:bg-gold group-hover:text-navy-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-pearl md:text-2xl">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pearl/60 md:text-base">
                      {point.description}
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
