"use client";

import { Search, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Area } from "@/services/modules/areas";
import type { Amenity } from "@/services/modules/amenities";
import type { PropertyTypeEntity } from "@/services/modules/property-types";
import type {
  PropertySearchParams,
  PropertySortKey,
} from "@/services/modules/property";

export interface FilterOptions {
  areas: Area[];
  propertyTypes: PropertyTypeEntity[];
  amenities: Amenity[];
}

interface PropertyFiltersProps {
  params: PropertySearchParams;
  options: FilterOptions;
  onChange: (next: PropertySearchParams) => void;
  onReset: () => void;
  resultCount: number;
  className?: string;
}

const BUDGET_PRESETS: { label: string; min?: number; max?: number }[] = [
  { label: "Any", min: undefined, max: undefined },
  { label: "Under ₹50k", max: 50_000 },
  { label: "₹50k–₹1L", min: 50_000, max: 100_000 },
  { label: "₹1L–₹2L", min: 100_000, max: 200_000 },
  { label: "₹2L–₹5L", min: 200_000, max: 500_000 },
  { label: "₹5L+", min: 500_000 },
];

const SORT_OPTIONS: { value: PropertySortKey; label: string }[] = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "rent-asc", label: "Rent: Low to High" },
  { value: "rent-desc", label: "Rent: High to Low" },
  { value: "sqft-desc", label: "Largest first" },
  { value: "newest", label: "Recently updated" },
];

export function PropertyFilters({
  params,
  options,
  onChange,
  onReset,
  resultCount,
  className,
}: PropertyFiltersProps) {
  const set = (patch: Partial<PropertySearchParams>) =>
    onChange({ ...params, ...patch, page: 1 });

  const selectedAmenities = Array.isArray(params.amenityIds)
    ? params.amenityIds
    : params.amenityIds
      ? params.amenityIds.split(",").filter(Boolean)
      : [];

  const toggleAmenity = (id: string) => {
    const next = selectedAmenities.includes(id)
      ? selectedAmenities.filter((a) => a !== id)
      : [...selectedAmenities, id];
    set({ amenityIds: next.length ? next : undefined });
  };

  return (
    <aside
      className={cn(
        "rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)] md:p-6",
        className,
      )}
      aria-label="Property filters"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-navy">Filters</h2>
          <p className="font-ui mt-0.5 text-xs text-text-muted">
            {resultCount} spaces found
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
          value={params.q ?? ""}
          onChange={(e) => set({ q: e.target.value || undefined })}
          placeholder="Search name, area, address"
          className="font-ui w-full bg-transparent text-sm text-navy outline-none placeholder:text-text-muted"
        />
      </label>

      <FilterGroup title="Sort">
        <select
          value={params.sort ?? "name-asc"}
          onChange={(e) => set({ sort: e.target.value as PropertySortKey })}
          className="font-ui w-full rounded-xl border border-soft-gray bg-warm-white px-3 py-2.5 text-sm text-navy outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Area">
        <select
          value={params.areaId ?? ""}
          onChange={(e) => set({ areaId: e.target.value || undefined })}
          className="font-ui w-full rounded-xl border border-soft-gray bg-warm-white px-3 py-2.5 text-sm text-navy outline-none"
        >
          <option value="">All areas</option>
          {options.areas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Property type">
        <select
          value={params.propertyTypeId ?? ""}
          onChange={(e) =>
            set({ propertyTypeId: e.target.value || undefined })
          }
          className="font-ui w-full rounded-xl border border-soft-gray bg-warm-white px-3 py-2.5 text-sm text-navy outline-none"
        >
          <option value="">All types</option>
          {options.propertyTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Budget (monthly)">
        <div className="flex flex-col gap-2">
          {BUDGET_PRESETS.map((preset) => {
            const active =
              params.rent1Min === preset.min && params.rent1Max === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  set({ rent1Min: preset.min, rent1Max: preset.max })
                }
                className={cn(
                  "font-ui rounded-full px-3 py-2 text-left text-xs uppercase tracking-[0.12em] transition",
                  active
                    ? "bg-navy text-pearl"
                    : "border border-soft-gray bg-warm-white text-navy hover:border-gold",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Size (sq.ft)">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={params.sqFeetMin ?? ""}
            onChange={(e) =>
              set({
                sqFeetMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="font-ui rounded-xl border border-soft-gray bg-warm-white px-3 py-2 text-sm outline-none"
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={params.sqFeetMax ?? ""}
            onChange={(e) =>
              set({
                sqFeetMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="font-ui rounded-xl border border-soft-gray bg-warm-white px-3 py-2 text-sm outline-none"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Amenities">
        <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
          {options.amenities.map((a) => (
            <label
              key={a.id}
              className="font-ui flex cursor-pointer items-center gap-2 text-sm text-navy"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a.id)}
                onChange={() => toggleAmenity(a.id)}
                className="accent-[var(--color-gold,#C9A962)]"
              />
              {a.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Status">
        <select
          value={params.status ?? "available"}
          onChange={(e) => set({ status: e.target.value || undefined })}
          className="font-ui w-full rounded-xl border border-soft-gray bg-warm-white px-3 py-2.5 text-sm text-navy outline-none"
        >
          <option value="available">Available</option>
          <option value="">All statuses</option>
          <option value="leased out by us">Leased out by us</option>
          <option value="leased out by others">Leased out by others</option>
        </select>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="font-ui mb-3 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}
