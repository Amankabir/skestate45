"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScaleReveal } from "@/animations/Reveal";
import type { FloorPlan } from "@/types";

interface ProjectFloorPlansProps {
  plans: FloorPlan[];
}

export function ProjectFloorPlans({ plans }: ProjectFloorPlansProps) {
  const [zoomId, setZoomId] = useState<string | null>(null);
  const active = plans.find((p) => p.id === zoomId);

  return (
    <section
      id="floor-plans"
      className="section-pad bg-warm-white"
      aria-labelledby="floorplans-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Floor Plans"
          title="Layouts designed for living well"
          description="Explore configurations with clear proportions — zoom in or download PDF plans."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <ScaleReveal key={plan.id} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-2xl border border-soft-gray bg-pearl shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]">
                <button
                  type="button"
                  onClick={() => setZoomId(plan.id)}
                  className="relative aspect-[4/3] w-full overflow-hidden"
                  aria-label={`Zoom ${plan.name}`}
                >
                  <Image
                    src={plan.image}
                    alt={`${plan.name} floor plan`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 opacity-0 transition group-hover:bg-navy-deep/40 group-hover:opacity-100">
                    <ZoomIn className="h-8 w-8 text-pearl" />
                  </span>
                </button>
                <div className="p-5">
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                    {plan.type}
                  </p>
                  <h3 className="font-display mt-1 text-xl text-navy">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{plan.area}</p>
                  <a
                    href={plan.pdfUrl}
                    className="font-ui mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-navy transition hover:text-gold"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </a>
                </div>
              </article>
            </ScaleReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/92 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Floor plan zoom"
            onClick={() => setZoomId(null)}
          >
            <button
              type="button"
              onClick={() => setZoomId(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl bg-pearl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="90vw"
                className="object-contain p-4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
