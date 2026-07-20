"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    id: "1",
    question: "What types of spaces do you list?",
    answer:
      "Furnished offices, semi-furnished, bareshell, retail, shops, godowns, and restaurant spaces across Delhi NCR.",
  },
  {
    id: "2",
    question: "Are rents shown on the website final?",
    answer:
      "Published monthly rents come from our live inventory. Final commercials are confirmed after a site visit and negotiation.",
  },
  {
    id: "3",
    question: "How do I schedule a visit?",
    answer:
      "Open any listing and submit an enquiry, or use the Contact page. Include your preferred area, size, and timeline.",
  },
  {
    id: "4",
    question: "Why do some listings have no photos?",
    answer:
      "Photos are uploaded in our CRM as they become available. You can still enquire for a private viewing.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-warm-white" aria-labelledby="faq-heading">
      <div
        className="pointer-events-none absolute -right-16 top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers about browsing and enquiring on SK Estate."
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
                        : "border-soft-gray bg-pearl/60",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
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
                            : "border-soft-gray text-navy",
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
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted md:px-6 md:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
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
