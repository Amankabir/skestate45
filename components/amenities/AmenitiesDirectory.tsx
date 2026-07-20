"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Building2,
  Users,
  Coffee,
  DoorOpen,
  Presentation,
  Compass,
  Layers,
  Sofa,
  Bath,
  Monitor,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";

export interface AmenityListItem {
  id: string;
  name: string;
  count: number;
}

interface AmenitiesDirectoryProps {
  amenities: AmenityListItem[];
  totalListings: number;
}

function iconForAmenity(name: string): LucideIcon {
  const key = name.toLowerCase();
  if (key.includes("conference")) return Presentation;
  if (key.includes("meeting")) return Users;
  if (key.includes("pantry") || key.includes("cafeteria")) return Coffee;
  if (key.includes("lift") || key.includes("elevator")) return Building2;
  if (key.includes("reception")) return Sofa;
  if (key.includes("washroom") || key.includes("toilet") || key.includes("bathroom"))
    return Bath;
  if (key.includes("work station") || key.includes("workstation")) return Monitor;
  if (key.includes("floor")) return Layers;
  if (key.includes("roof") || key.includes("terrace")) return DoorOpen;
  if (key.includes("facing") || key.includes("vastu") || key.includes("north") || key.includes("south") || key.includes("east") || key.includes("west"))
    return Compass;
  return Sparkles;
}

export function AmenitiesDirectory({
  amenities,
  totalListings,
}: AmenitiesDirectoryProps) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = needle
      ? amenities.filter((a) => a.name.toLowerCase().includes(needle))
      : amenities;
    return [...list].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [amenities, q]);

  return (
    <section className="relative overflow-hidden bg-ivory pb-20 pt-10 md:pb-28 md:pt-14">
      <div
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="container-luxury">
        <FadeIn>
          <label className="flex max-w-xl items-center gap-3 rounded-full border border-soft-gray bg-pearl px-5 py-3.5 shadow-[var(--shadow-soft)]">
            <Search className="h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span className="sr-only">Search amenities</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search amenity — pantry, lift, conference…"
              className="font-ui w-full bg-transparent text-sm text-navy outline-none placeholder:text-text-muted"
            />
          </label>
        </FadeIn>

        <p className="font-ui mt-6 text-sm text-text-muted">
          Showing{" "}
          <span className="font-medium text-navy">{filtered.length}</span>{" "}
          amenities · used across {totalListings} available spaces
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No amenities match"
              description="Try another keyword or clear search."
              action={
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="font-ui rounded-full bg-navy px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl"
                >
                  Clear search
                </button>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((amenity, i) => {
                const Icon = iconForAmenity(amenity.name);
                return (
                  <motion.div
                    key={amenity.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i, 12) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/properties?amenityIds=${amenity.id}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-lift)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-gold transition group-hover:bg-navy group-hover:text-pearl">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy/40 transition group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>

                      <h2 className="font-display mt-5 text-xl text-navy transition group-hover:text-gold">
                        {amenity.name}
                      </h2>
                      <p className="font-ui mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
                        {amenity.count}{" "}
                        {amenity.count === 1 ? "match" : "matches"} available
                      </p>

                      <span className="font-ui mt-auto pt-5 text-[0.65rem] uppercase tracking-[0.14em] text-gold opacity-0 transition group-hover:opacity-100">
                        View properties →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
