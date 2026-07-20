"use client";

import { motion } from "framer-motion";
import { TRUST_LOGOS } from "@/constants/content";
import { FadeIn } from "@/animations/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function TrustBar() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section
      id="trust"
      className="relative overflow-hidden border-y border-soft-gray/70 bg-pearl py-14 md:py-16"
      aria-labelledby="trust-heading"
    >
      <div className="container-luxury">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <FadeIn>
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
                Trusted By
              </p>
              <h2
                id="trust-heading"
                className="font-display mt-3 text-3xl text-navy md:text-4xl"
              >
                Partners in landmark living
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { end: 18, suffix: "+", label: "Years" },
                  { end: 180, suffix: "+", label: "Projects" },
                  { end: 47, suffix: "", label: "Awards" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-2xl text-navy md:text-3xl">
                      <AnimatedCounter end={item.end} suffix={item.suffix} />
                    </p>
                    <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-text-muted">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-pearl to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-pearl to-transparent" />
            <motion.div
              className="flex w-max gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              {logos.map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-soft-gray/80 bg-warm-white/80"
                >
                  <span className="font-display text-lg tracking-wide text-navy/55">
                    {logo}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
