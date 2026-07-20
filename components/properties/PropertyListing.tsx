"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  PropertyFilters,
  type FilterOptions,
} from "@/components/properties/PropertyFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { useProperties } from "@/hooks/useProperties";
import type { PropertySearchParams } from "@/services/modules/property";

const DEFAULT_PARAMS: PropertySearchParams = {
  status: "available",
  page: 1,
  pageSize: 12,
  sort: "name-asc",
};

function parseParams(sp: URLSearchParams): PropertySearchParams {
  const num = (key: string) => {
    const v = sp.get(key);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const amenityIds = sp.get("amenityIds");
  return {
    q: sp.get("q") || undefined,
    status: sp.get("status") ?? "available",
    areaId: sp.get("areaId") || undefined,
    propertyTypeId: sp.get("propertyTypeId") || undefined,
    amenityIds: amenityIds ? amenityIds.split(",").filter(Boolean) : undefined,
    rent1Min: num("rent1Min") ?? num("budgetMin"),
    rent1Max: num("rent1Max") ?? num("budgetMax"),
    sqFeetMin: num("sqFeetMin"),
    sqFeetMax: num("sqFeetMax"),
    leaseTenureMin: num("leaseTenureMin"),
    leaseTenureMax: num("leaseTenureMax"),
    sort: (sp.get("sort") as PropertySearchParams["sort"]) || "name-asc",
    page: num("page") ?? 1,
    pageSize: num("pageSize") ?? 12,
  };
}

function toSearchString(params: PropertySearchParams): string {
  const sp = new URLSearchParams();
  const set = (k: string, v: string | number | undefined | null) => {
    if (v === undefined || v === null || v === "") return;
    sp.set(k, String(v));
  };

  set("q", params.q);
  if (params.status !== undefined && params.status !== "available") {
    const statusValue = Array.isArray(params.status)
      ? params.status.join(",")
      : params.status;
    set("status", statusValue);
  }
  set("areaId", params.areaId);
  set("propertyTypeId", params.propertyTypeId);
  if (params.amenityIds) {
    const ids = Array.isArray(params.amenityIds)
      ? params.amenityIds.join(",")
      : params.amenityIds;
    if (ids) sp.set("amenityIds", ids);
  }
  set("rent1Min", params.rent1Min);
  set("rent1Max", params.rent1Max);
  set("sqFeetMin", params.sqFeetMin);
  set("sqFeetMax", params.sqFeetMax);
  set("leaseTenureMin", params.leaseTenureMin);
  set("leaseTenureMax", params.leaseTenureMax);
  if (params.sort && params.sort !== "name-asc") set("sort", params.sort);
  if (params.page && params.page > 1) set("page", params.page);
  if (params.pageSize && params.pageSize !== 12) set("pageSize", params.pageSize);

  return sp.toString();
}

interface PropertyListingProps {
  options: FilterOptions;
}

export function PropertyListing({ options }: PropertyListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const params = useMemo(
    () => parseParams(searchParams),
    [searchParams],
  );

  const { data, error, loading, reload, isPending } = useProperties(params);

  const syncUrl = useCallback(
    (next: PropertySearchParams) => {
      const qs = toSearchString(next);
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const reset = () => syncUrl({ ...DEFAULT_PARAMS });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  const filterPanel = (
    <PropertyFilters
      params={params}
      options={options}
      onChange={syncUrl}
      onReset={reset}
      resultCount={data?.meta.total ?? 0}
    />
  );

  return (
    <div className="container-luxury pb-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="hidden w-full shrink-0 lg:sticky lg:top-28 lg:block lg:w-[300px]">
          {filterPanel}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.18em] text-gold">
                Commercial spaces
              </p>
              <h2 className="font-display text-2xl text-navy md:text-3xl">
                {loading && !data
                  ? "Loading…"
                  : `${data?.meta.total ?? 0} ${(data?.meta.total ?? 0) === 1 ? "property" : "properties"}`}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="font-ui inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-navy lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : loading && !data ? (
            <LoadingSkeleton count={6} />
          ) : !data?.items.length ? (
            <EmptyState
              title="No properties match"
              description="Try clearing filters or broadening your budget and area."
              action={
                <button
                  type="button"
                  onClick={reset}
                  className="font-ui rounded-full bg-navy px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl"
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <>
              <div
                className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${isPending ? "opacity-70" : ""}`}
              >
                {data.items.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
              <Pagination
                className="mt-10"
                page={data.meta.page}
                totalPages={data.meta.totalPages}
                onPageChange={(page) => syncUrl({ ...params, page })}
              />
            </>
          )}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/50"
            aria-label="Close filters"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-pearl shadow-xl">
            <div className="flex items-center justify-between border-b border-soft-gray px-4 py-4">
              <h2 className="font-display text-xl text-navy">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filterPanel}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
