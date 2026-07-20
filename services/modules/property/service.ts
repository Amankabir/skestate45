import {
  paginateArray,
  type PaginatedResult,
} from "@/services/modules/common/types";
import { fetchPropertiesApi, fetchPropertyByIdApi } from "./api";
import { mapProperties, mapProperty } from "./mapper";
import type {
  Property,
  PropertyListFilters,
  PropertySearchParams,
  PropertySortKey,
} from "./types";

export async function getProperties(
  filters?: PropertyListFilters,
): Promise<Property[]> {
  const raw = await fetchPropertiesApi(filters);
  return mapProperties(raw);
}

export async function getPropertyById(id: string): Promise<Property> {
  const raw = await fetchPropertyByIdApi(id);
  return mapProperty(raw);
}

function applyClientSearch(items: Property[], q?: string): Property[] {
  if (!q?.trim()) return items;
  const needle = q.trim().toLowerCase();
  return items.filter((p) => {
    const hay = [
      p.name,
      p.address,
      p.areaName,
      p.propertyTypeName,
      p.description,
      p.status,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });
}

function applySort(items: Property[], sort: PropertySortKey = "name-asc"): Property[] {
  const copy = [...items];
  switch (sort) {
    case "name-desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "rent-asc":
      return copy.sort((a, b) => (a.rent ?? Infinity) - (b.rent ?? Infinity));
    case "rent-desc":
      return copy.sort((a, b) => (b.rent ?? -1) - (a.rent ?? -1));
    case "sqft-asc":
      return copy.sort(
        (a, b) => (a.sqFeet ?? Infinity) - (b.sqFeet ?? Infinity),
      );
    case "sqft-desc":
      return copy.sort((a, b) => (b.sqFeet ?? -1) - (a.sqFeet ?? -1));
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case "name-asc":
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Search with API filters + client-side q/sort/pagination.
 * Backend has no text search, sort options, or pagination — documented in PROJECT_REPORT.
 */
export async function searchProperties(
  params: PropertySearchParams = {},
): Promise<PaginatedResult<Property>> {
  const {
    q,
    sort = "name-asc",
    page = 1,
    pageSize = 12,
    ...filters
  } = params;

  const list = await getProperties(filters);
  const filtered = applyClientSearch(list, q);
  const sorted = applySort(filtered, sort);
  return paginateArray(sorted, page, pageSize);
}

export async function getRelatedProperties(
  property: Property,
  limit = 4,
): Promise<Property[]> {
  const siblings = await getProperties({
    areaId: property.areaId,
    status: "available",
  });

  return siblings
    .filter((p) => p.id !== property.id)
    .slice(0, limit);
}

export async function getFeaturedProperties(limit = 8): Promise<Property[]> {
  const available = await getProperties({ status: "available" });
  const withPhotos = available.filter((p) => p.photos.length > 0);
  const pool = withPhotos.length >= limit ? withPhotos : available;
  return pool.slice(0, limit);
}

export async function getPropertyIds(): Promise<string[]> {
  const list = await getProperties();
  return list.map((p) => p.id);
}
