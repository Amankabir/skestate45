"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { KeyRound, Compass, Sparkles, LineChart } from "lucide-react";

const ITEMS = [
  {
    title: "Verified commercial inventory",
    body: "Every listing syncs from our live CRM — rent, size, amenities, and availability stay current.",
  },
  {
    title: "Micro-market coverage",
    body: "From Connaught Place to South Delhi, filter by the localities that matter to your business.",
  },
  {
    title: "Transparent leasing terms",
    body: "See published rent and square footage where available before you enquire.",
  },
  {
    title: "Direct enquiry to our team",
    body: "Submit a requirement online — advisors receive it with full page context.",
  },
];

const ICONS = [KeyRound, Compass, Sparkles, LineChart];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="on-dark section-pad relative overflow-hidden bg-navy"
      aria-labelledby="why-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,90,0.14),transparent_45%)]"
        aria-hidden
      />

      <div className="container-luxury relative z-[2] grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative hidden overflow-hidden rounded-3xl lg:block">
          <motion.div className="relative aspect-[4/5]" style={{ y: imageY }}>
            <Image
              src={HOME_VISUALS.why}
              alt="Professional workspace for growing teams"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
        </div>

        <div>
          <SectionHeading
            eyebrow="Why SK Estate"
            title="Leasing support built for operators"
            description="Shortlist furnished offices, retail, and commercial spaces with clear next steps."
            light
          />

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {ITEMS.map((item, i) => {
              const Icon = ICONS[i]!;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <li className="h-full rounded-2xl border border-pearl/10 bg-pearl/[0.06] p-5 backdrop-blur-sm transition hover:border-gold/40 hover:bg-pearl/[0.1]">
                    <Icon className="mb-3 h-5 w-5 text-gold" />
                    <h3 className="font-display text-lg text-pearl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pearl/65">
                      {item.body}
                    </p>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
