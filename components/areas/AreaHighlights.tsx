"use client";

import {
  TrainFront,
  Plane,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Briefcase,
  Trees,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { GlowCard } from "@/components/ui/MagneticButton";
import type { AreaHighlight } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  train: TrainFront,
  plane: Plane,
  graduation: GraduationCap,
  hospital: Hospital,
  shopping: ShoppingBag,
  briefcase: Briefcase,
  trees: Trees,
  utensils: Utensils,
};

interface AreaHighlightsProps {
  areaName: string;
  highlights: AreaHighlight[];
}

export function AreaHighlights({ areaName, highlights }: AreaHighlightsProps) {
  return (
    <section
      className="section-pad bg-warm-white"
      aria-labelledby="highlights-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Area Highlights"
          title={`Why residents choose ${areaName}`}
          description="Connectivity, education, healthcare, and leisure — the everyday advantages that define this address."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Briefcase;
            return (
              <FadeIn key={item.id} delay={i * 0.06} direction="up">
                <GlowCard className="h-full rounded-2xl border border-soft-gray bg-pearl p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[var(--shadow-soft)]">
                  <div className="relative z-[1]">
                    <motion.span
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold"
                      whileHover={{ rotate: 8, scale: 1.08 }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </motion.span>
                    <p className="font-display text-2xl text-navy">{item.value}</p>
                    <h3 className="font-ui mt-2 text-sm font-medium uppercase tracking-[0.12em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
