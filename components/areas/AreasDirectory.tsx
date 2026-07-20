"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaCard } from "@/components/home/AreaCard";
import { FadeIn } from "@/animations/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";

export interface AreaListItem {
  id: string;
  name: string;
  count: number;
  cover?: string;
}

interface AreasDirectoryProps {
  areas: AreaListItem[];
  totalListings: number;
}

type SortKey = "listings" | "name";

export function AreasDirectory({ areas, totalListings }: AreasDirectoryProps) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("listings");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = areas;
    if (needle) {
      list = list.filter((a) => a.name.toLowerCase().includes(needle));
    }
    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.count - a.count || a.name.localeCompare(b.name);
    });
  }, [areas, q, sort]);

  return (
    <section className="relative overflow-hidden bg-ivory pb-20 pt-10 md:pb-28 md:pt-14">
      <div
        className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="container-luxury">
        <FadeIn>
          <div className="flex flex-col gap-4 rounded-2xl border border-soft-gray bg-pearl p-4 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:gap-3 md:p-3">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-warm-white px-4 py-3 md:rounded-full">
              <Search className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span className="sr-only">Search areas</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search area — CP, Okhla, Green Park…"
                className="font-ui w-full bg-transparent text-sm text-navy outline-none placeholder:text-text-muted"
              />
            </label>

            <div className="flex items-center gap-2">
              {(
                [
                  ["listings", "Most listings"],
                  ["name", "A–Z"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSort(value)}
                  className={`font-ui rounded-full px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.14em] transition ${
                    sort === value
                      ? "bg-navy text-pearl"
                      : "border border-soft-gray bg-warm-white text-navy hover:border-gold"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-ui text-sm text-text-muted">
            Showing{" "}
            <span className="font-medium text-navy">{filtered.length}</span> of{" "}
            {areas.length} areas · {totalListings} available spaces
          </p>
          <Link
            href="/properties"
            className="font-ui inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-gold transition hover:text-navy"
          >
            Browse all properties
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No areas match"
              description="Try another spelling or clear the search."
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
          <motion.div
            layout
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((area, i) => (
                <motion.div
                  key={area.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i, 11) * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <AreaCard
                    id={area.id}
                    name={area.name}
                    count={area.count}
                    cover={area.cover}
                    fallbackIndex={i}
                    badge={
                      i === 0 && sort === "listings" && !q
                        ? "Most listed"
                        : undefined
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
