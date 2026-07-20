"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CharReveal, FadeIn } from "@/animations/Reveal";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { SITE } from "@/constants/site";

interface AreasHeroProps {
  areaCount: number;
  listingCount: number;
}

export function AreasHero({ areaCount, listingCount }: AreasHeroProps) {
  return (
    <section className="on-dark relative flex min-h-[52svh] items-end overflow-hidden bg-navy-deep md:min-h-[58svh]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HOME_VISUALS.areas[0]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
          quality={80}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/50 to-navy-deep/92"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,151,90,0.2),transparent_50%)]"
        aria-hidden
      />

      <div className="container-luxury relative z-10 pb-12 pt-28 md:pb-16 md:pt-32">
        <FadeIn>
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Areas · {SITE.name}
          </p>
        </FadeIn>

        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-tight text-pearl md:text-6xl">
          <CharReveal text="Explore every" />
          <br />
          <span className="italic text-champagne">
            <CharReveal text="micro-market." delay={0.2} />
          </span>
        </h1>

        <FadeIn delay={0.35}>
          <p className="mt-5 max-w-xl text-base text-pearl/75 md:text-lg">
            {areaCount} localities · {listingCount} available commercial spaces
            across Delhi NCR.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: "Localities", value: areaCount },
              { label: "Live spaces", value: listingCount },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-pearl md:text-4xl">
                  {stat.value}
                  <span className="text-gold">+</span>
                </p>
                <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
