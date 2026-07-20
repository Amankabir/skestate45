"use client";

import {
  Waves,
  Dumbbell,
  Building2,
  Baby,
  Trees,
  PersonStanding,
  Zap,
  Home,
  Cctv,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { ProjectAmenity } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  building: Building2,
  toy: Baby,
  trees: Trees,
  person: PersonStanding,
  zap: Zap,
  home: Home,
  camera: Cctv,
  shield: Shield,
};

interface ProjectAmenitiesProps {
  amenities: ProjectAmenity[];
}

export function ProjectAmenities({ amenities }: ProjectAmenitiesProps) {
  return (
    <section
      id="amenities"
      className="on-dark section-pad relative overflow-hidden bg-navy"
      aria-labelledby="amenities-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,151,90,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Amenities"
          title="A private world within"
          description="Wellness, leisure, and security — curated for everyday luxury."
          light
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {amenities.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Home;
            return (
              <FadeIn key={item.id} delay={i * 0.05} direction="up">
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-pearl/10 bg-pearl/[0.05] px-4 py-7 text-center backdrop-blur-sm transition hover:border-gold/40 hover:bg-pearl/[0.09]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-ui text-xs uppercase tracking-[0.14em] text-pearl">
                    {item.name}
                  </h3>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
