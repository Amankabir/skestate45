"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { CharReveal } from "@/animations/Reveal";
import { HeroSearch } from "@/components/home/HeroSearch";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { SITE } from "@/constants/site";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=85";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const parallax = useMouseParallax(18);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-navy-deep"
      aria-labelledby="hero-heading"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          style={{
            x: parallax.x,
            y: parallax.y,
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Luxury villa with infinity pool at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/35 to-navy-deep/80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,151,90,0.22),transparent_50%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-emerald/15 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full pb-16 pt-32 md:pb-20 md:pt-36"
      >
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pearl/25 bg-pearl/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
            <span className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-pearl/90">
              Est. Atelier · Private Collection 2026
            </span>
          </motion.div>

          <p className="font-accent mb-3 text-2xl text-champagne md:text-3xl">
            <CharReveal text={SITE.name} delay={0.35} />
          </p>

          <h1
            id="hero-heading"
            className="font-display max-w-4xl text-4xl leading-[1.08] text-pearl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 28px rgba(10,26,47,0.4)" }}
          >
            <CharReveal text="Residences curated" className="text-pearl" delay={0.45} />
            <br />
            <span className="text-gradient-gold">
              <CharReveal text="for a rarer life" delay={0.75} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-pearl/75 md:text-lg"
          >
            Discover architecturally significant homes across India&apos;s most
            coveted addresses — with white-glove advisory from first viewing to
            keys in hand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.65 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton as="a" href="/contact" className="btn-gold rounded-full">
              Book a Private Visit
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/properties"
              className="btn-ghost rounded-full"
            >
              Explore Properties
            </MagneticButton>
          </motion.div>

          <div className="mt-10">
            <HeroSearch />
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-wrap gap-8 md:gap-12">
              {[
                { end: 18, suffix: "+", label: "Years of Trust" },
                { end: 180, suffix: "+", label: "Landmark Projects" },
                { end: 4200, suffix: "+", label: "Families Served" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.25 + i * 0.1, duration: 0.6 }}
                >
                  <p className="font-display text-3xl text-pearl md:text-4xl">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="font-ui mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-pearl/55">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="font-ui group hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-pearl/60 md:inline-flex"
            >
              Scroll
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowDown className="h-4 w-4 text-gold" />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      <Link href="#trust" className="sr-only">
        Skip to content
      </Link>
    </section>
  );
}
