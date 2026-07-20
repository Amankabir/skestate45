"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CharReveal, FadeIn } from "@/animations/Reveal";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { SITE } from "@/constants/site";

interface AmenitiesHeroProps {
  amenityCount: number;
  listingCount: number;
}

export function AmenitiesHero({
  amenityCount,
  listingCount,
}: AmenitiesHeroProps) {
  return (
    <section className="on-dark relative flex min-h-[48svh] items-end overflow-hidden bg-navy-deep md:min-h-[54svh]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HOME_VISUALS.types.furnished}
          alt="Furnished commercial workspace amenities"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={80}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/50 to-navy-deep/92"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(184,151,90,0.2),transparent_50%)]"
        aria-hidden
      />

      <div className="container-luxury relative z-10 pb-12 pt-28 md:pb-14 md:pt-32">
        <FadeIn>
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Amenities · {SITE.name}
          </p>
        </FadeIn>

        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-tight text-pearl md:text-6xl">
          <CharReveal text="Filter spaces by" />
          <br />
          <span className="italic text-champagne">
            <CharReveal text="what you need." delay={0.2} />
          </span>
        </h1>

        <FadeIn delay={0.35}>
          <p className="mt-5 max-w-xl text-base text-pearl/75 md:text-lg">
            {amenityCount} amenity tags from live inventory — pantry, lift,
            conference rooms, and more across {listingCount}+ available spaces.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                {amenityCount}
              </p>
              <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl/55">
                Amenities
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                {listingCount}
                <span className="text-gold">+</span>
              </p>
              <p className="font-ui mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl/55">
                Live spaces
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
