"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { PaymentPlanTier } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectPaymentProps {
  plans: PaymentPlanTier[];
}

export function ProjectPayment({ plans }: ProjectPaymentProps) {
  return (
    <section
      id="payment"
      className="section-pad bg-warm-white"
      aria-labelledby="payment-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Payment Plan"
          title="Flexible ways to own"
          description="Choose a structure that aligns with your cash flow — our advisors will walk you through every milestone."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 md:p-8",
                  plan.featured
                    ? "on-dark border-gold bg-navy text-pearl shadow-[0_24px_60px_rgba(15,39,68,0.25)]"
                    : "border-soft-gray bg-pearl"
                )}
              >
                {plan.featured && (
                  <span className="font-ui absolute right-5 top-5 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-navy-deep">
                    Popular
                  </span>
                )}
                <p
                  className={cn(
                    "font-ui text-[0.65rem] uppercase tracking-[0.18em]",
                    plan.featured ? "text-champagne" : "text-gold"
                  )}
                >
                  {plan.name}
                </p>
                <p
                  className={cn(
                    "font-display mt-3 text-4xl",
                    plan.featured ? "text-pearl" : "text-navy"
                  )}
                >
                  {plan.downPayment}
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    plan.featured ? "text-pearl/60" : "text-text-muted"
                  )}
                >
                  Down payment
                </p>
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    plan.featured ? "text-pearl/70" : "text-text-muted"
                  )}
                >
                  {plan.description}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.milestones.map((m) => (
                    <li
                      key={m.label}
                      className={cn(
                        "flex items-center justify-between border-t pt-3 text-sm",
                        plan.featured
                          ? "border-pearl/15 text-pearl/85"
                          : "border-soft-gray text-navy"
                      )}
                    >
                      <span>{m.label}</span>
                      <span className="font-display text-lg">{m.percent}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
