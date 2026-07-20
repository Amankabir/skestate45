"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants/site";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/animations/Reveal";

export function AboutStats() {
  return (
    <section
      className="relative overflow-hidden bg-pearl py-20 md:py-24"
      aria-labelledby="about-stats-heading"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,151,90,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(184,151,90,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <div className="container-luxury relative z-[2]">
        <h2 id="about-stats-heading" className="sr-only">
          SK Estate by the numbers
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.id} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-display text-4xl text-navy md:text-5xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <div className="mx-auto my-3 h-px w-10 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
