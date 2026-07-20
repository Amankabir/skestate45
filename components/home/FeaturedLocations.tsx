"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOCATIONS } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClipReveal, FadeIn } from "@/animations/Reveal";

export function FeaturedLocations() {
  return (
    <section
      className="section-pad relative overflow-hidden gradient-mesh"
      aria-labelledby="locations-heading"
    >
      <div className="noise-overlay opacity-[0.025]" aria-hidden />
      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Featured Locations"
          title="Addresses that define desire"
          description="From Golf Course Road to the Arabian Sea — explore micro-markets where architecture, lifestyle, and long-term value converge."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc, i) => (
            <FadeIn key={loc.id} delay={i * 0.1} direction="up">
              <Link
                href={loc.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <ClipReveal delay={0.1 + i * 0.08} className="absolute inset-0">
                  <Image
                    src={loc.image}
                    alt={`${loc.name} luxury residences`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </ClipReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
                <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-gold/50" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.2em] text-champagne">
                    {loc.city}
                  </p>
                  <h3 className="font-display mt-1 text-2xl text-pearl">
                    {loc.name}
                  </h3>
                  <p className="mt-2 text-sm text-pearl/70 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    {loc.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-ui text-xs text-pearl/80">
                      {loc.propertyCount} properties
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pearl/15 text-pearl backdrop-blur-md transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-gold group-hover:text-navy-deep">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <motion.div
          className="gold-line mt-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
