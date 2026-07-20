"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import {
  DEFAULT_FILTERS,
  FILTER_CITIES,
  FILTER_TYPES,
  PROPERTY_LISTINGS,
  filterProperties,
  type PropertyFiltersState,
  type PropertySort,
} from "@/constants/properties";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: PropertySort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest Area" },
  { value: "newest", label: "Newest" },
];

export function PropertyListing() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFiltersState>(DEFAULT_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const intentParam = searchParams.get("intent");
    const typeParam = searchParams.get("type");
    const areaParam = searchParams.get("area");
    const cityParam = searchParams.get("city");

    const typeMap: Record<string, string> = {
      apartment: "Apartment",
      villa: "Villa",
      penthouse: "Penthouse",
      luxury: "Luxury Home",
      "luxury home": "Luxury Home",
      "builder-floor": "Builder Floor",
      "builder floor": "Builder Floor",
    };

    const mappedType = typeParam
      ? typeMap[typeParam.toLowerCase()] ??
        FILTER_TYPES.find(
          (t) => t.toLowerCase() === typeParam.toLowerCase()
        )
      : undefined;

    const mappedCity = cityParam
      ? cityParam
      : areaParam
        ? areaParam.charAt(0).toUpperCase() + areaParam.slice(1)
        : undefined;

    setFilters((prev) => ({
      ...prev,
      q,
      intent:
        intentParam === "buy" || intentParam === "rent" ? intentParam : prev.intent,
      types: mappedType ? [mappedType] : prev.types,
      cities:
        mappedCity &&
        FILTER_CITIES.some(
          (c) => c.toLowerCase() === mappedCity.toLowerCase()
        )
          ? [
              FILTER_CITIES.find(
                (c) => c.toLowerCase() === mappedCity.toLowerCase()
              )!,
            ]
          : prev.cities,
    }));
  }, [searchParams]);

  const results = useMemo(
    () => filterProperties(PROPERTY_LISTINGS, filters),
    [filters]
  );

  const reset = () => setFilters(DEFAULT_FILTERS);

  const filterPanel = (
    <PropertyFilters
      filters={filters}
      onChange={setFilters}
      onReset={reset}
      resultCount={results.length}
    />
  );

  return (
    <div className="container-luxury pb-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Desktop sidebar */}
        <div className="hidden w-full shrink-0 lg:sticky lg:top-28 lg:block lg:w-[300px]">
          {filterPanel}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.18em] text-gold">
                Residences
              </p>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {results.length}{" "}
                {results.length === 1 ? "property" : "properties"}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="font-ui inline-flex items-center gap-2 rounded-full border border-soft-gray bg-pearl px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-navy lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <label className="font-ui flex items-center gap-2 rounded-full border border-soft-gray bg-pearl px-3 py-2 text-xs text-navy">
                <span className="hidden text-text-muted sm:inline">Sort</span>
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sort: e.target.value as PropertySort,
                    })
                  }
                  className="bg-transparent outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="hidden items-center rounded-full border border-soft-gray bg-pearl p-1 sm:flex">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={cn(
                    "rounded-full p-2 transition",
                    view === "grid" ? "bg-navy text-pearl" : "text-navy-muted"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={cn(
                    "rounded-full p-2 transition",
                    view === "list" ? "bg-navy text-pearl" : "text-navy-muted"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-soft-gray bg-warm-white px-6 py-16 text-center">
              <p className="font-display text-2xl text-navy">No homes match</p>
              <p className="mt-2 text-sm text-text-muted">
                Try adjusting filters or reset to see the full collection.
              </p>
              <button
                type="button"
                onClick={reset}
                className="btn-primary mt-6 rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-6",
                view === "grid" ? "sm:grid-cols-2" : "grid-cols-1"
              )}
            >
              {results.map((property, i) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={Math.min(i, 6)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-navy-deep/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col bg-ivory shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-soft-gray px-4 py-4">
                <p className="font-display text-lg text-navy">Filters</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-gray text-navy"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">{filterPanel}</div>
              <div className="border-t border-soft-gray p-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full rounded-full"
                >
                  Show {results.length} homes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
