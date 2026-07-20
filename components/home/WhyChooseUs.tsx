"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WHY_CHOOSE } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { KeyRound, Compass, Sparkles, LineChart } from "lucide-react";

const ICONS = [KeyRound, Compass, Sparkles, LineChart];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="on-dark section-pad relative overflow-hidden bg-navy"
      aria-labelledby="why-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,90,0.15),transparent_45%)]"
        aria-hidden
      />
      <div className="noise-overlay opacity-[0.04]" aria-hidden />

      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Why SK Estate"
          title="An atelier approach to finding home"
          description="We measure success not in listings closed, but in lives quietly elevated."
          light
        />

        <div className="relative mt-16 grid gap-0 lg:grid-cols-[auto_1fr]">
          <div className="relative mx-auto hidden w-px lg:block" aria-hidden>
            <div className="absolute inset-0 bg-pearl/10" />
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-gold to-champagne"
              style={{ height: lineHeight }}
            />
          </div>

          <ol className="grid gap-6 md:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <FadeIn key={item.id} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
                  <li className="glass group relative h-full rounded-2xl border-pearl/10 bg-pearl/[0.06] p-7 transition duration-500 hover:bg-pearl/[0.1]">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-accent text-4xl text-gold/80">{item.year}</span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition duration-500 group-hover:rotate-12 group-hover:bg-gold group-hover:text-navy-deep">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-pearl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-pearl/65 md:text-base">
                      {item.description}
                    </p>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
