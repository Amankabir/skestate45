import { AREAS, AREA_SLUGS } from "@/constants/areas";
import type { AreaPage } from "@/types";

/**
 * CMS / API-ready accessors.
 * Swap implementations to fetch from Sanity, Strapi, or a REST API
 * without changing page components.
 */
export function getAllAreaSlugs(): string[] {
  return AREA_SLUGS;
}

export function getAreaBySlug(slug: string): AreaPage | null {
  return AREAS[slug] ?? null;
}

export function getAllAreas(): AreaPage[] {
  return AREA_SLUGS.map((slug) => AREAS[slug]);
}

export async function fetchAreaBySlug(slug: string): Promise<AreaPage | null> {
  // Placeholder for future async CMS fetch
  return getAreaBySlug(slug);
}
