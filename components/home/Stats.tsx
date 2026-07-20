"use client";

import { STATS } from "@/constants/site";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/animations/Reveal";
import { motion } from "framer-motion";

export function Stats() {
  return (
    <section
      className="on-dark relative overflow-hidden bg-navy py-20 md:py-24"
      aria-labelledby="stats-heading"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,151,90,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(184,151,90,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <div className="container-luxury relative z-[2]">
        <h2 id="stats-heading" className="sr-only">
          SK Estate in numbers
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.id} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="font-display text-4xl text-pearl md:text-5xl lg:text-6xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <div className="mx-auto my-4 h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-pearl/55">
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
