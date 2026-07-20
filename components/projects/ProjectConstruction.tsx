"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { ConstructionMilestone } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectConstructionProps {
  milestones: ConstructionMilestone[];
}

function ProgressBar({
  progress,
  status,
}: {
  progress: number;
  status: ConstructionMilestone["status"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelector(".bar-fill"),
      { width: "0%" },
      { width: `${progress}%`, duration: 1.4, ease: "power3.out" }
    );
  }, [inView, progress]);

  return (
    <div ref={ref} className="mt-3 h-1.5 overflow-hidden rounded-full bg-soft-gray">
      <div
        className={cn(
          "bar-fill h-full rounded-full",
          status === "completed" && "bg-emerald",
          status === "current" && "bg-gold",
          status === "upcoming" && "bg-navy/25"
        )}
        style={{ width: 0 }}
      />
    </div>
  );
}

export function ProjectConstruction({ milestones }: ProjectConstructionProps) {
  return (
    <section
      className="section-pad bg-pearl"
      aria-labelledby="construction-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Construction Progress"
          title="Building with transparency"
          description="Track every phase from foundation to possession."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, i) => (
            <FadeIn key={m.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                className={cn(
                  "h-full rounded-2xl border p-6 transition",
                  m.status === "current"
                    ? "border-gold/50 bg-warm-white shadow-[var(--shadow-soft)]"
                    : "border-soft-gray bg-ivory"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "font-ui rounded-full px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em]",
                      m.status === "completed" && "bg-emerald/10 text-emerald",
                      m.status === "current" && "bg-gold/20 text-navy",
                      m.status === "upcoming" && "bg-mist text-navy-muted"
                    )}
                  >
                    {m.status}
                  </span>
                  <span className="font-ui text-xs text-text-muted">{m.date}</span>
                </div>
                <h3 className="font-display mt-4 text-xl text-navy">{m.phase}</h3>
                <p className="mt-2 text-sm text-text-muted">{m.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-ui text-navy-muted">Progress</span>
                  <span className="font-display text-navy">{m.progress}%</span>
                </div>
                <ProgressBar progress={m.progress} status={m.status} />
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
