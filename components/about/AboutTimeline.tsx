"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface AboutTimelineProps {
  timeline: readonly TimelineItem[];
}

export function AboutTimeline({ timeline }: AboutTimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="on-dark section-pad relative overflow-hidden bg-navy"
      aria-labelledby="timeline-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,90,0.12),transparent_45%)]"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Journey"
          title="Milestones along the way"
          description="From a boutique desk in Gurugram to a national atelier of curated living."
          light
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-pearl/10 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />
          <motion.div
            className="absolute left-[15px] top-2 w-px origin-top bg-gradient-to-b from-gold to-champagne md:left-1/2 md:-translate-x-px"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <FadeIn
                key={item.id}
                delay={i * 0.08}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <li
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden w-1/2 md:block" />
                  <span className="absolute left-[7px] z-[1] flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-navy md:left-1/2 md:-translate-x-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <div
                    className={`ml-10 flex-1 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"
                    }`}
                  >
                    <p className="font-ui text-xs uppercase tracking-[0.2em] text-champagne">
                      {item.year}
                    </p>
                    <h3 className="font-display mt-1 text-2xl text-pearl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pearl/60">
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
