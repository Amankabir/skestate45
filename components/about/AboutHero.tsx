"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { CharReveal } from "@/animations/Reveal";
import { SITE } from "@/constants/site";

interface AboutHeroProps {
  image: string;
  intro: string;
}

export function AboutHero({ image, intro }: AboutHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[75svh] items-end overflow-hidden bg-navy-deep md:min-h-[85svh]"
      aria-labelledby="about-hero-heading"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image
          src={image}
          alt="SK Estate atelier — luxury residences and considered living"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-navy-deep/40 to-navy-deep/88"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,151,90,0.2),transparent_50%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <div className="container-luxury">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="font-ui flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-pearl/60">
              <li>
                <Link href="/" className="transition hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-champagne" aria-current="page">
                About
              </li>
            </ol>
          </nav>

          <p className="font-ui mb-4 text-xs uppercase tracking-[0.28em] text-champagne">
            Our Atelier
          </p>
          <h1
            id="about-hero-heading"
            className="font-display max-w-3xl text-5xl leading-[1.05] text-pearl md:text-6xl lg:text-7xl"
          >
            <CharReveal text={SITE.name} delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="font-accent mt-5 max-w-2xl text-2xl text-champagne md:text-3xl"
          >
            {SITE.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-pearl/70 md:text-lg"
          >
            {intro}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
