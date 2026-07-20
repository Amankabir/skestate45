"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Download, Calendar } from "lucide-react";
import { SITE } from "@/constants/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn, CharReveal } from "@/animations/Reveal";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=85";

export function CTA() {
  return (
    <section
      className="on-dark relative overflow-hidden py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <Image
        src={CTA_IMAGE}
        alt="Luxury interior — book a private visit with SK Estate"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/50" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/88 via-navy-deep/55 to-navy-deep/25"
        aria-hidden
      />

      <div className="container-luxury relative z-10">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
              Begin Your Journey
            </p>
          </FadeIn>
          <h2
            id="cta-heading"
            className="font-display mt-4 text-4xl text-pearl md:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 24px rgba(10,26,47,0.45)" }}
          >
            <CharReveal text="Your next address" className="text-pearl" />
            <br />
            <span className="text-gradient-gold">
              <CharReveal text="awaits discovery" delay={0.25} />
            </span>
          </h2>
          <FadeIn delay={0.3}>
            <p className="mt-5 text-base leading-relaxed text-pearl/70 md:text-lg">
              Schedule a private consultation with our advisory team — or reach
              us directly. Every conversation begins with listening.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton as="a" href="/contact" className="btn-gold rounded-full">
                <Calendar className="h-4 w-4" />
                Book a Visit
              </MagneticButton>
              <MagneticButton
                as="a"
                href={SITE.phoneHref}
                className="btn-ghost rounded-full"
              >
                <Phone className="h-4 w-4" />
                Call Concierge
              </MagneticButton>
              <MagneticButton
                as="a"
                href={SITE.whatsapp}
                className="btn-ghost rounded-full"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </MagneticButton>
              <Link
                href="/brochure"
                className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/30 px-5 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-champagne hover:bg-pearl/10"
              >
                <Download className="h-4 w-4" />
                Brochure
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
