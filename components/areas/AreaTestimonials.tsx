"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { Testimonial } from "@/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface AreaTestimonialsProps {
  areaName: string;
  testimonials: Testimonial[];
}

export function AreaTestimonials({
  areaName,
  testimonials,
}: AreaTestimonialsProps) {
  return (
    <section
      className="section-pad gradient-mesh"
      aria-labelledby="area-testimonials-heading"
    >
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Resident Voices"
          title={`Living in ${areaName}`}
          description="Stories from families and investors who chose this address."
          align="center"
          className="mx-auto"
        />

        <FadeIn delay={0.15} className="mx-auto mt-14 max-w-4xl">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="!pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <figure className="glass relative rounded-3xl px-8 py-10 md:px-14 md:py-14">
                  <Quote
                    className="absolute right-8 top-8 h-12 w-12 text-gold/25 md:h-16 md:w-16"
                    aria-hidden
                  />
                  <div
                    className="mb-6 flex gap-1"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="font-accent text-2xl leading-snug text-navy md:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/40">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg text-navy">{t.name}</p>
                      <p className="font-ui text-xs uppercase tracking-[0.14em] text-text-muted">
                        {t.role} · {t.property}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
