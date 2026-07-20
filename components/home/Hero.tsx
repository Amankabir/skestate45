"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { CharReveal, FadeIn } from "@/animations/Reveal";
import { HeroSearch } from "@/components/home/HeroSearch";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { SITE } from "@/constants/site";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import type { Area } from "@/services/modules/areas";
import type { PropertyTypeEntity } from "@/services/modules/property-types";

interface HeroProps {
  areas: Area[];
  propertyTypes: PropertyTypeEntity[];
}

export function Hero({ areas, propertyTypes }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const parallax = useMouseParallax(10);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-navy-deep"
      aria-labelledby="hero-heading"
    >
      {/* Soft atmospheric photo — kept very light so copy stays primary */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          style={{ x: parallax.x, y: parallax.y }}
        >
          <Image
            src={HOME_VISUALS.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] opacity-[0.22] md:opacity-[0.28]"
            quality={75}
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/92 to-navy-deep/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/85"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_28%,rgba(184,151,90,0.16),transparent_52%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full pb-14 pt-28 md:pb-20 md:pt-32"
      >
        <div className="container-luxury">
          <FadeIn>
            <p className="font-ui mb-5 text-xs uppercase tracking-[0.32em] text-champagne">
              {SITE.name}
            </p>
          </FadeIn>

          <h1
            id="hero-heading"
            className="font-display max-w-4xl text-[2.6rem] leading-[1.08] text-pearl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <CharReveal text="Find the right" />
            <br />
            <span className="italic text-champagne">
              <CharReveal text="commercial space." delay={0.2} />
            </span>
          </h1>

          <FadeIn delay={0.35}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-pearl/80 md:text-lg">
              Offices, retail & shops across Delhi NCR — search live inventory
              and enquire in minutes.
            </p>
          </FadeIn>

          <div className="mt-9 max-w-4xl">
            <HeroSearch areas={areas} propertyTypes={propertyTypes} />
          </div>

          <FadeIn delay={0.55}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/properties"
                className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
              >
                Browse all spaces
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="font-ui inline-flex items-center rounded-full border border-pearl/35 px-6 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-gold hover:text-gold"
              >
                Talk to an advisor
              </Link>
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}
