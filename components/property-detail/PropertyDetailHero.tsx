"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  X,
  ChevronLeft,
} from "lucide-react";
import { CharReveal } from "@/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/constants/site";
import type { PropertyDetail } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  property: PropertyDetail;
}

export function PropertyDetailHero({ property }: Props) {
  const [liked, setLiked] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section
        className="on-dark relative overflow-hidden bg-navy-deep pt-24"
        aria-labelledby="property-detail-heading"
      >
        <div className="container-luxury pb-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="font-ui flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-pearl/60">
              <li>
                <Link href="/" className="transition hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link href="/properties" className="transition hover:text-gold">
                  Properties
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-champagne" aria-current="page">
                {property.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
            <button
              type="button"
              onClick={() => setLightbox(0)}
              className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[420px]"
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </button>
            {property.images.slice(1, 5).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setLightbox(i + 1)}
                className={cn(
                  "relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block",
                  i >= 2 && property.images.length < 5 && "md:col-span-1"
                )}
              >
                <Image
                  src={img}
                  alt={`${property.title} view ${i + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
                {i === 3 && property.images.length > 5 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/55 font-ui text-sm uppercase tracking-[0.16em] text-pearl">
                    +{property.images.length - 5} more
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {property.badge && (
                  <span className="font-ui rounded-full bg-gold/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-champagne">
                    {property.badge}
                  </span>
                )}
                <span className="font-ui rounded-full border border-pearl/25 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl/80">
                  {property.status ?? "Available"}
                </span>
                <span className="font-ui rounded-full border border-pearl/25 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-pearl/80">
                  For {property.intent === "rent" ? "Rent" : "Sale"}
                </span>
              </div>
              <h1
                id="property-detail-heading"
                className="font-display mt-4 text-3xl text-pearl md:text-5xl"
              >
                <CharReveal text={property.title} className="text-pearl" />
              </h1>
              <p className="font-accent mt-2 text-xl text-champagne">
                {property.tagline}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-pearl/70">
                <MapPin className="h-4 w-4 text-gold" />
                {property.location}
              </p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm text-pearl/80">
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
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="text-left md:text-right">
                <p className="font-display text-3xl text-pearl md:text-4xl">
                  {property.priceLabel}
                </p>
                <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-pearl/50">
                  {property.type}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <MagneticButton
                  as="a"
                  href={`/contact?property=${property.slug}&intent=visit`}
                  className="btn-gold rounded-full"
                >
                  <Calendar className="h-4 w-4" />
                  Book Visit
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={SITE.whatsapp}
                  className="btn-ghost rounded-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => setLiked((v) => !v)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/30 text-pearl transition hover:border-gold hover:text-gold"
                  aria-label="Wishlist"
                >
                  <Heart className={cn("h-4 w-4", liked && "fill-gold text-gold")} />
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-pearl/30 text-pearl transition hover:border-gold hover:text-gold"
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/94 p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(
                  (lightbox - 1 + property.images.length) % property.images.length
                );
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl md:right-8"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % property.images.length);
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={property.images[lightbox]}
                alt=""
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
