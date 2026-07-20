"use client";

import { Search, RotateCcw } from "lucide-react";
import {
  FILTER_BEDS,
  FILTER_CITIES,
  FILTER_TYPES,
  PRICE_RANGES,
  type PropertyFiltersState,
} from "@/constants/properties";
import { cn } from "@/lib/utils";

interface PropertyFiltersProps {
  filters: PropertyFiltersState;
  onChange: (next: PropertyFiltersState) => void;
  onReset: () => void;
  resultCount: number;
  className?: string;
}

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function PropertyFilters({
  filters,
  onChange,
  onReset,
  resultCount,
  className,
}: PropertyFiltersProps) {
  const set = (patch: Partial<PropertyFiltersState>) =>
    onChange({ ...filters, ...patch });

  return (
    <aside
      className={cn(
        "rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)] md:p-6",
        className
      )}
      aria-label="Property filters"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-navy">Filters</h2>
          <p className="font-ui mt-0.5 text-xs text-text-muted">
            {resultCount} homes found
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="font-ui inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-navy-muted transition hover:text-gold"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <label className="mb-6 flex items-center gap-3 rounded-full border border-soft-gray bg-warm-white px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-gold" aria-hidden />
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={filters.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Search locality or project"
          className="font-ui w-full bg-transparent text-sm text-navy outline-none placeholder:text-text-muted"
        />
      </label>

      <FilterGroup title="Intent">
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["all", "All"],
              ["buy", "Buy"],
              ["rent", "Rent"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => set({ intent: value })}
              className={cn(
                "font-ui rounded-full py-2 text-xs uppercase tracking-[0.12em] transition",
                filters.intent === value
                  ? "bg-navy text-pearl"
                  : "border border-soft-gray bg-warm-white text-navy hover:border-gold"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="City / Area">
        <div className="flex flex-col gap-2">
          {FILTER_CITIES.map((city) => (
            <label
              key={city}
              className="flex cursor-pointer items-center gap-3 text-sm text-navy"
            >
              <input
                type="checkbox"
                checked={filters.cities.includes(city)}
                onChange={() =>
                  set({ cities: toggleInArray(filters.cities, city) })
                }
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {city}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Property Type">
        <div className="flex flex-col gap-2">
          {FILTER_TYPES.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 text-sm text-navy"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() =>
                  set({ types: toggleInArray(filters.types, type) })
                }
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {type}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Budget">
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-navy"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.id}
                onChange={() => set({ priceRange: range.id })}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Bedrooms" last>
        <div className="flex flex-wrap gap-2">
          {FILTER_BEDS.map((bed) => {
            const active = filters.beds.includes(bed);
            return (
              <button
                key={bed}
                type="button"
                onClick={() =>
                  set({ beds: toggleInArray(filters.beds, bed) })
                }
                className={cn(
                  "font-ui min-w-12 rounded-full px-3 py-2 text-xs transition",
                  active
                    ? "bg-gold text-navy-deep"
                    : "border border-soft-gray text-navy hover:border-gold"
                )}
              >
                {bed}+
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn(!last && "mb-6 border-b border-soft-gray/80 pb-6")}>
      <p className="font-ui mb-3 text-[0.65rem] uppercase tracking-[0.18em] text-gold">
        {title}
      </p>
      {children}
    </div>
  );
}
