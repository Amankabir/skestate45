"use client";

import { Award, Building2, CalendarDays, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { BuilderProfile } from "@/types";

interface ProjectBuilderProps {
  builder: BuilderProfile;
}

export function ProjectBuilder({ builder }: ProjectBuilderProps) {
  return (
    <section
      className="section-pad bg-ivory"
      aria-labelledby="builder-heading"
    >
      <div className="container-luxury">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn direction="right">
            <div className="rounded-3xl border border-soft-gray bg-pearl p-8 shadow-[var(--shadow-soft)] md:p-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-mist">
                <span className="font-display text-2xl text-navy">
                  {builder.logoText}
                </span>
              </div>
              <h2
                id="builder-heading"
                className="font-display mt-6 text-3xl text-navy md:text-4xl"
              >
                {builder.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                {builder.history}
              </p>
              <ul className="mt-6 space-y-2">
                {builder.highlights.map((h) => (
                  <li
                    key={h}
                    className="border-l-2 border-gold/40 pl-3 text-sm text-navy"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <div>
            <SectionHeading
              eyebrow="Builder Profile"
              title="A legacy of trusted delivery"
              description={`Founded ${builder.founded} · ${builder.experience} of shaping India's skylines.`}
            />
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                {
                  icon: Building2,
                  end: builder.completedProjects,
                  suffix: "+",
                  label: "Completed",
                },
                {
                  icon: Layers,
                  end: builder.ongoingProjects,
                  suffix: "+",
                  label: "Ongoing",
                },
                {
                  icon: Award,
                  end: builder.awards,
                  suffix: "+",
                  label: "Awards",
                },
                {
                  icon: CalendarDays,
                  end: parseInt(builder.experience, 10) || 35,
                  suffix: "+",
                  label: "Years",
                },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={0.1 + i * 0.08}>
                  <article className="rounded-2xl border border-soft-gray bg-pearl p-5 transition hover:border-gold/35">
                    <stat.icon className="h-5 w-5 text-gold" />
                    <p className="font-display mt-3 text-3xl text-navy">
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                    </p>
                    <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-text-muted">
                      {stat.label}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
