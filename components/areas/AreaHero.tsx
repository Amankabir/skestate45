"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, MapPin, Calendar } from "lucide-react";
import { CharReveal } from "@/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SITE } from "@/constants/site";
import type { AreaPage } from "@/types";

interface AreaHeroProps {
  area: AreaPage;
}

export function AreaHero({ area }: AreaHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[85svh] items-end overflow-hidden bg-navy-deep md:min-h-[90svh]"
      aria-labelledby="area-hero-heading"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <Image
          src={area.heroImage}
          alt={`Luxury properties and skyline in ${area.name}, ${area.city}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-navy-deep/40 to-navy-deep/85"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(184,151,90,0.2),transparent_50%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-14 pt-28 md:pb-20 md:pt-36"
      >
        <div className="container-luxury">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="font-ui flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-pearl/60">
              <li>
                <Link href="/" className="transition hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link href="/areas" className="transition hover:text-gold">
                  Areas
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-champagne" aria-current="page">
                {area.name}
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-pearl/25 bg-pearl/10 px-4 py-1.5 backdrop-blur-md"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden />
            <span className="font-ui text-[0.7rem] uppercase tracking-[0.2em] text-pearl/90">
              {area.city}, {area.state}
            </span>
          </motion.div>

          <h1
            id="area-hero-heading"
            className="font-display max-w-3xl text-5xl leading-[1.05] text-pearl md:text-6xl lg:text-7xl"
          >
            <CharReveal text={area.name} delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="font-accent mt-4 max-w-xl text-xl text-champagne md:text-2xl"
          >
            {area.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-8 md:gap-14"
          >
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                {area.avgPrice}
              </p>
              <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-pearl/55">
                Avg. {area.priceUnit}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                <AnimatedCounter end={area.propertyCount} suffix="+" />
              </p>
              <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-pearl/55">
                Curated Properties
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                {area.growthPercent}
              </p>
              <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-pearl/55">
                YoY Growth
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton
              as="a"
              href={`/contact?area=${area.slug}&intent=visit`}
              className="btn-gold rounded-full"
            >
              <Calendar className="h-4 w-4" />
              Book Site Visit
            </MagneticButton>
            <MagneticButton
              as="a"
              href={`#properties`}
              className="btn-ghost rounded-full"
            >
              View Properties
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SITE.phoneHref}
              className="btn-ghost rounded-full"
            >
              Call Concierge
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
