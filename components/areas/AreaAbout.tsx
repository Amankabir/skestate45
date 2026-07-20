"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";
import type { AreaAboutSection } from "@/types";

interface AreaAboutProps {
  areaName: string;
  intro: string;
  sections: AreaAboutSection[];
}

export function AreaAbout({ areaName, intro, sections }: AreaAboutProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden bg-ivory"
      aria-labelledby="about-area-heading"
    >
      <motion.p
        style={{ x }}
        className="pointer-events-none absolute -top-4 left-0 font-display text-[12vw] font-medium leading-none text-navy/[0.03] whitespace-nowrap"
        aria-hidden
      >
        {areaName} · {areaName} · {areaName}
      </motion.p>

      <div className="container-luxury relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={`About ${areaName}`}
              title={`Understanding ${areaName}`}
              description={intro}
            />
          </div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <FadeIn key={section.id} delay={i * 0.1} direction="left">
                <article className="group border-l-2 border-soft-gray pl-6 transition-colors duration-500 hover:border-gold">
                  <ClipReveal delay={0.05 + i * 0.05}>
                    <h3 className="font-display text-2xl text-navy">
                      {section.title}
                    </h3>
                  </ClipReveal>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                    {section.content}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
