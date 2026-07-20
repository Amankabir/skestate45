"use client";

import Image from "next/image";
import { Calendar, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn, CharReveal } from "@/animations/Reveal";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=85";

export function AboutCTA() {
  return (
    <section
      className="on-dark relative overflow-hidden py-20 md:py-28"
      aria-labelledby="about-cta-heading"
    >
      <Image
        src={CTA_IMAGE}
        alt="Luxury residence — begin a conversation with SK Estate"
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-navy-deep/55" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/88 via-navy-deep/55 to-navy-deep/25"
        aria-hidden
      />

      <div className="container-luxury relative z-10 max-w-2xl">
        <FadeIn>
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Begin a Conversation
          </p>
        </FadeIn>
        <h2
          id="about-cta-heading"
          className="font-display mt-4 text-4xl text-pearl md:text-5xl"
          style={{ textShadow: "0 2px 24px rgba(10,26,47,0.45)" }}
        >
          <CharReveal text="Meet the atelier" className="text-pearl" />
        </h2>
        <FadeIn delay={0.25}>
          <p className="mt-5 text-base leading-relaxed text-pearl/70 md:text-lg">
            Whether you are searching for a primary residence, a coastal
            retreat, or an investment — we would be honoured to listen.
          </p>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton as="a" href="/contact" className="btn-gold rounded-full">
              <Calendar className="h-4 w-4" />
              Book a Consultation
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SITE.phoneHref}
              className="btn-ghost rounded-full"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SITE.whatsapp}
              className="btn-ghost rounded-full"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
