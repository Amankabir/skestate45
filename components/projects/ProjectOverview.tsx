"use client";

import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, TextReveal } from "@/animations/Reveal";

interface ProjectOverviewProps {
  projectName: string;
  overview: string;
  highlights: string[];
  whyInvest: string[];
}

export function ProjectOverview({
  projectName,
  overview,
  highlights,
  whyInvest,
}: ProjectOverviewProps) {
  return (
    <section
      className="section-pad relative overflow-hidden bg-ivory"
      aria-labelledby="overview-heading"
    >
      <div className="container-luxury">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Project Overview"
              title={`About ${projectName}`}
              description={overview}
            />

            <div className="mt-10 space-y-4">
              {highlights.map((item, i) => (
                <FadeIn key={item} delay={i * 0.06} direction="left">
                  <div className="flex items-start gap-3 rounded-xl border border-transparent bg-pearl/60 px-4 py-3 transition hover:border-gold/30">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm text-navy md:text-base">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn direction="right" delay={0.15}>
            <aside className="on-dark relative overflow-hidden rounded-3xl bg-navy p-8 md:p-10">
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl"
                aria-hidden
              />
              <Sparkles className="relative h-6 w-6 text-gold" />
              <TextReveal
                text="Why invest"
                as="h3"
                className="relative mt-4 text-3xl text-pearl"
              />
              <ul className="relative mt-8 space-y-5">
                {whyInvest.map((item, i) => (
                  <li
                    key={item}
                    className="border-l border-gold/40 pl-4 text-sm leading-relaxed text-pearl/75"
                  >
                    <span className="font-ui mb-1 block text-[0.65rem] uppercase tracking-[0.18em] text-champagne">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
