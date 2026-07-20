"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTY_TYPES } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

export function PropertyTypes() {
  return (
    <section
      className="section-pad bg-ivory"
      aria-labelledby="types-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Property Types"
          title="Every form of exceptional living"
          description="From sky residences to coastal estates — explore by the life you want to lead."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PROPERTY_TYPES.map((type, i) => (
            <FadeIn key={type.id} delay={i * 0.06} direction="none">
              <Link
                href={type.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[3/4]"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent transition-opacity duration-500" />

                <motion.div
                  className="absolute inset-0 border-2 border-transparent transition-colors duration-400 group-hover:border-gold/60"
                  style={{ borderRadius: "1rem" }}
                />

                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 transition-transform duration-500 group-hover:translate-y-0 md:p-5">
                  <h3 className="font-display text-lg text-pearl md:text-xl">
                    {type.name}
                  </h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-xs text-pearl/70 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {type.description}
                  </p>
                  <p className="font-ui mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-champagne">
                    {type.count} listings
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
