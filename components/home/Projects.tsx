"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { PROJECTS } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export function Projects() {
  return (
    <section
      className="section-pad overflow-hidden bg-mist/50"
      aria-labelledby="projects-heading"
    >
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="New Projects"
            title="Launches worth arriving early for"
            description="Invitation-only and soft-launch residences from India's most respected developers."
          />
          <FadeIn delay={0.15}>
            <div className="flex gap-2">
              <button
                type="button"
                className="projects-prev flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:text-gold"
                aria-label="Previous project"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="projects-next flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:text-gold"
                aria-label="Next project"
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
            prevEl: ".projects-prev",
            nextEl: ".projects-next",
          }}
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1.4, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 28 },
            1280: { slidesPerView: 2.6, spaceBetween: 32 },
          }}
        >
          {PROJECTS.map((project) => (
            <SwiperSlide key={project.id}>
              <article className="group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-ui rounded-full bg-pearl/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl backdrop-blur-md">
                      {project.status}
                    </span>
                    <span className="font-display rounded-lg bg-pearl/90 px-3 py-1.5 text-sm text-navy backdrop-blur-sm">
                      {project.builder}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-pearl md:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-pearl/70">{project.location}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-ui flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-champagne">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {project.launchDate}
                        </p>
                        <p className="font-display mt-1 text-xl text-pearl">
                          {project.priceFrom}
                        </p>
                      </div>
                      <Link
                        href={project.href}
                        className="btn-gold rounded-full px-5 py-2.5 text-xs"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
