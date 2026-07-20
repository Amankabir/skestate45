"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SITE } from "@/constants/site";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { FadeIn, CharReveal } from "@/animations/Reveal";

interface CTAProps {
  backgroundImage?: string | null;
}

export function CTA({ backgroundImage }: CTAProps) {
  const src = backgroundImage || HOME_VISUALS.cta;

  return (
    <section
      className="on-dark relative overflow-hidden py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <Image
        src={src}
        alt="Enquire about commercial spaces"
        fill
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
      <div className="absolute inset-0 bg-navy-deep/55" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/70 to-navy-deep/35"
        aria-hidden
      />

      <div className="container-luxury relative z-10">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
              Next step
            </p>
          </FadeIn>
          <h2
            id="cta-heading"
            className="font-display mt-4 text-4xl text-pearl md:text-5xl lg:text-6xl"
          >
            <CharReveal text="Ready to shortlist" className="text-pearl" />
            <br />
            <span className="italic text-champagne">
              <CharReveal text="your next space?" delay={0.2} />
            </span>
          </h2>
          <FadeIn delay={0.3}>
            <p className="mt-5 text-base leading-relaxed text-pearl/75 md:text-lg">
              Share your area, size, and budget — we&apos;ll match options from
              live inventory.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
              >
                <Calendar className="h-4 w-4" />
                Enquire now
              </Link>
              <a
                href={SITE.phoneHref}
                className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/35 bg-pearl/5 px-5 py-3 text-xs uppercase tracking-[0.14em] text-pearl backdrop-blur-sm transition hover:border-gold"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/35 bg-pearl/5 px-5 py-3 text-xs uppercase tracking-[0.14em] text-pearl backdrop-blur-sm transition hover:border-gold"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
