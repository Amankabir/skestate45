"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";

interface ProjectMasterPlanProps {
  projectName: string;
  image: string;
}

export function ProjectMasterPlan({
  projectName,
  image,
}: ProjectMasterPlanProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  return (
    <section
      id="master-plan"
      className="section-pad bg-ivory"
      aria-labelledby="masterplan-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Master Plan"
          title="The estate, composed"
          description={`A carefully orchestrated layout of towers, courts, and amenities at ${projectName}.`}
        />

        <FadeIn delay={0.15}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-soft-gray shadow-[var(--shadow-lift)]">
            <ClipReveal>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative block aspect-[21/9] w-full min-h-[280px]"
                aria-label="View master plan fullscreen"
              >
                <Image
                  src={image}
                  alt={`${projectName} master plan`}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
                <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-pearl/95 px-4 py-2 font-ui text-xs uppercase tracking-[0.14em] text-navy backdrop-blur-sm transition group-hover:bg-gold">
                  <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
                </span>
              </button>
            </ClipReveal>
          </div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-navy-deep"
            role="dialog"
            aria-modal="true"
            aria-label="Master plan fullscreen"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="font-display text-lg text-pearl">Master Plan</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.max(1, s - 0.25))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl/10 text-pearl"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl/10 text-pearl"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setScale(1);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl/10 text-pearl"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative flex-1 overflow-auto">
              <div
                className="relative mx-auto h-full min-h-[70vh] w-full max-w-6xl transition-transform duration-300"
                style={{ transform: `scale(${scale})`, transformOrigin: "center top" }}
              >
                <Image
                  src={image}
                  alt={`${projectName} master plan enlarged`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
