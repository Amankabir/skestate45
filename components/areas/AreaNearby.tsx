"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";
import type { NearbyArea } from "@/types";

interface AreaNearbyProps {
  areas: NearbyArea[];
}

export function AreaNearby({ areas }: AreaNearbyProps) {
  return (
    <section className="section-pad gradient-mesh" aria-labelledby="nearby-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Nearby Locations"
          title="Explore adjoining addresses"
          description="Comparable west and north-west Delhi micro-markets for buyers comparing lifestyle and value."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, i) => (
            <FadeIn key={area.id} delay={i * 0.08}>
              <Link
                href={`/areas/${area.slug}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <ClipReveal delay={i * 0.05} className="relative aspect-[3/4]">
                  <Image
                    src={area.image}
                    alt={`${area.name} real estate`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                </ClipReveal>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-champagne">
                    {area.distance} away
                  </p>
                  <h3 className="font-display mt-1 text-2xl text-pearl">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-sm text-pearl/65">{area.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-ui text-xs text-pearl/80">
                      {area.avgPrice}
                    </span>
                    <motion.span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/15 text-pearl backdrop-blur-md"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="h-4 w-4 transition group-hover:text-gold" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
