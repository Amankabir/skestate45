"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { LocationAdvantage } from "@/types";

interface ProjectLocationProps {
  projectName: string;
  advantages: LocationAdvantage[];
}

export function ProjectLocation({
  projectName,
  advantages,
}: ProjectLocationProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="location"
      className="section-pad bg-pearl"
      aria-labelledby="location-adv-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Location Advantages"
          title={`Connected to the best of ${projectName.split(" ").pop()}`}
          description="Metro, schools, healthcare, and business — minutes from your door."
        />

        <div className="relative mt-16 max-w-3xl">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-soft-gray md:left-[19px]"
            aria-hidden
          />
          <motion.div
            className="absolute left-[15px] top-2 w-px origin-top bg-gradient-to-b from-gold to-champagne md:left-[19px]"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <ol className="space-y-8">
            {advantages.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.08} direction="left">
                <li className="relative flex gap-6 pl-1 md:gap-8">
                  <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-pearl font-ui text-xs text-navy md:h-10 md:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 rounded-2xl border border-soft-gray bg-warm-white p-5 transition hover:border-gold/35 hover:shadow-[var(--shadow-soft)]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl text-navy">
                        {item.title}
                      </h3>
                      <span className="font-ui text-xs uppercase tracking-[0.14em] text-gold">
                        {item.distance} · {item.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
