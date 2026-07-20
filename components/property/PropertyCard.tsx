"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  Maximize,
  MapPin,
  Share2,
  Home,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatRent, formatSqFeet, formatStatus } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/services/modules/property";

import "swiper/css";
import "swiper/css/pagination";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [copied, setCopied] = useState(false);
  const hasPhotos = property.photos.length > 0;

  const share = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${property.href}`
        : property.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 8) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-soft-gray/80 bg-pearl shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[var(--shadow-lift)]"
    >
      {/* Media — compact */}
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        {hasPhotos ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="h-full w-full property-card-swiper"
          >
            {property.photos.map((img, i) => (
              <SwiperSlide key={`${img}-${i}`}>
                <Link
                  href={property.href}
                  className="relative block h-full w-full"
                >
                  <Image
                    src={img}
                    alt={`${property.name} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Link
            href={property.href}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(160deg, #eef2f6 0%, #dfe6ee 45%, #cfd8e3 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(184,151,90,0.25), transparent 50%), radial-gradient(circle at 70% 70%, rgba(15,39,68,0.08), transparent 45%)",
              }}
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-2.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 bg-pearl text-navy/55 shadow-sm transition group-hover:border-gold/40 group-hover:text-gold">
                <Home className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="font-ui text-[0.58rem] uppercase tracking-[0.16em] text-navy-muted">
                Photo coming soon
              </span>
            </div>
          </Link>
        )}

        <span
          className={cn(
            "font-ui absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] shadow-sm backdrop-blur-sm",
            property.isAvailable
              ? "bg-emerald/90 text-pearl"
              : "bg-pearl/95 text-navy",
          )}
        >
          {formatStatus(property.status)}
        </span>

        <button
          type="button"
          onClick={share}
          aria-label="Share property"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-pearl/95 text-navy shadow-sm transition hover:text-gold"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
        {copied ? (
          <span className="font-ui absolute right-3 top-12 z-10 rounded-full bg-pearl px-2 py-1 text-[0.55rem] text-navy shadow">
            Copied
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-ui text-[0.6rem] uppercase tracking-[0.16em] text-gold">
              {property.propertyTypeName}
            </p>
            <h3 className="font-display mt-1 truncate text-lg text-navy md:text-xl">
              <Link
                href={property.href}
                className="transition-colors hover:text-gold"
              >
                {property.name}
              </Link>
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="truncate">
                {property.areaName || property.address}
              </span>
            </p>
          </div>
          <p className="font-display shrink-0 text-base text-navy md:text-lg">
            {formatRent(property.rent)}
          </p>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <span className="font-ui inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-[0.65rem] text-navy-muted">
            <Maximize className="h-3 w-3 text-gold" />
            {formatSqFeet(property.sqFeet)}
          </span>
          {property.amenities.slice(0, 2).map((a) => (
            <span
              key={a.id}
              className="font-ui rounded-full bg-mist px-2.5 py-1 text-[0.65rem] text-navy-muted"
            >
              {a.name}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={property.href}
            className="font-ui inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy/12 py-2.5 text-[0.65rem] uppercase tracking-[0.12em] text-navy transition hover:border-gold hover:text-gold"
          >
            Details
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
          <Link
            href={`/contact?propertyId=${property.id}`}
            className="font-ui flex-1 rounded-full bg-navy py-2.5 text-center text-[0.65rem] uppercase tracking-[0.12em] text-pearl transition hover:bg-navy-deep"
          >
            Enquire
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
