"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section id="faq" className="section-pad bg-ivory" aria-labelledby="faq-heading">
      <div className="container-luxury">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers, without the noise"
            description="Everything you need to know about working with SK Estate — from private viewings to NRI acquisitions."
          />

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <FadeIn key={faq.id} delay={i * 0.06}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-colors duration-300",
                      isOpen
                        ? "border-gold/40 bg-pearl shadow-[var(--shadow-soft)]"
                        : "border-soft-gray bg-pearl/60"
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      id={`faq-button-${faq.id}`}
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                    >
                      <span className="font-display text-lg text-navy md:text-xl">
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition",
                          isOpen
                            ? "border-gold bg-gold text-navy-deep"
                            : "border-soft-gray text-navy"
                        )}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-button-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted md:px-6 md:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
