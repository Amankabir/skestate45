"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { AreaBuilder } from "@/types";

interface AreaBuildersProps {
  areaName: string;
  builders: AreaBuilder[];
}

export function AreaBuilders({ areaName, builders }: AreaBuildersProps) {
  return (
    <section
      className="section-pad bg-warm-white"
      aria-labelledby="builders-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Builders"
          title={`Developers shaping ${areaName}`}
          description="Trusted names delivering residential projects across this planned sub-city."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((builder, i) => (
            <FadeIn key={builder.id} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex items-center gap-5 rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-mist">
                  <span className="font-display text-lg text-navy/70">
                    {builder.logoText}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg text-navy">
                    {builder.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {builder.highlight}
                  </p>
                  <div className="font-ui mt-2 flex gap-4 text-[0.65rem] uppercase tracking-[0.14em] text-navy-muted">
                    <span>{builder.projects} Projects</span>
                    <span>{builder.experience}</span>
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
