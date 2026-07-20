"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { SimilarProject } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface ProjectSimilarProps {
  projects: SimilarProject[];
}

export function ProjectSimilar({ projects }: ProjectSimilarProps) {
  return (
    <section
      className="section-pad overflow-hidden bg-mist/40"
      aria-labelledby="similar-heading"
    >
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Similar Projects"
            title="You may also consider"
            description="Comparable luxury launches curated by our advisory desk."
          />
          <FadeIn delay={0.1}>
            <div className="flex gap-2">
              <button
                type="button"
                className="similar-prev flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:text-gold"
                aria-label="Previous"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="similar-next flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:text-gold"
                aria-label="Next"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="mt-12 pl-[max(4vw,calc((100vw-1280px)/2+4vw))]">
        <Swiper
          modules={[Navigation, FreeMode]}
          freeMode
          navigation={{
            prevEl: ".similar-prev",
            nextEl: ".similar-next",
          }}
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 24 },
            1024: { slidesPerView: 2.4, spaceBetween: 28 },
            1280: { slidesPerView: 2.8, spaceBetween: 32 },
          }}
        >
          {projects.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                href={p.href}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-ui rounded-full bg-pearl/15 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-pearl backdrop-blur-sm">
                    {p.status}
                  </span>
                  <h3 className="font-display mt-3 text-2xl text-pearl">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-pearl/65">
                    {p.builder} · {p.location}
                  </p>
                  <p className="font-display mt-3 text-lg text-champagne">
                    {p.priceFrom}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
