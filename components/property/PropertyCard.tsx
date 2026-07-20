"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  Heart,
  Share2,
  GitCompareArrows,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScaleReveal } from "@/animations/Reveal";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

import "swiper/css";
import "swiper/css/pagination";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);

  return (
    <ScaleReveal delay={index * 0.08}>
      <article
        className="group overflow-hidden rounded-2xl bg-pearl shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
        onMouseEnter={() => setPriceVisible(true)}
        onMouseLeave={() => setPriceVisible(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: true }}
            className="h-full w-full"
            loop
          >
            {property.images.map((img) => (
              <SwiperSlide key={img}>
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {property.badge && (
            <span className="font-ui absolute left-4 top-4 z-10 rounded-full bg-navy/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl backdrop-blur-sm">
              {property.badge}
            </span>
          )}

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => setLiked((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/95 text-navy shadow-md transition hover:text-gold"
            >
              <Heart className={cn("h-4 w-4", liked && "fill-gold text-gold")} />
            </button>
            <button
              type="button"
              aria-label="Share property"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/95 text-navy shadow-md transition hover:text-gold"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Compare property"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/95 text-navy shadow-md transition hover:text-gold"
            >
              <GitCompareArrows className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                {property.type}
              </p>
              <h3 className="font-display mt-1 text-xl text-navy md:text-2xl">
                <Link
                  href={property.href}
                  className="transition-colors hover:text-gold"
                >
                  {property.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-text-muted">{property.location}</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={priceVisible ? "anim" : "static"}
                initial={priceVisible ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                className="font-display shrink-0 text-lg text-navy md:text-xl"
              >
                {property.priceLabel}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 border-t border-soft-gray/80 pt-4 text-sm text-navy-muted">
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-gold" /> {property.beds} Beds
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-gold" /> {property.baths} Baths
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-gold" />{" "}
              {property.area.toLocaleString()} sq.ft
            </span>
          </div>

          <div className="mt-5 flex gap-2">
            <Link
              href={property.href}
              className="font-ui flex-1 rounded-full border border-navy/15 py-2.5 text-center text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
            >
              View Details
            </Link>
            <Link
              href={`/contact?property=${property.id}`}
              className="font-ui inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-2.5 text-xs uppercase tracking-[0.14em] text-pearl transition hover:bg-navy-deep"
            >
              <Calendar className="h-3.5 w-3.5" />
              Schedule Visit
            </Link>
          </div>
        </div>
      </article>
    </ScaleReveal>
  );
}
