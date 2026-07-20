import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getAreas } from "@/services/modules/areas";
import { getPropertyIds } from "@/services/modules/property";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/properties",
    "/areas",
    "/amenities",
    "/about",
    "/contact",
    "/search",
  ];

  let areaRoutes: string[] = [];
  let propertyRoutes: string[] = [];

  try {
    const [areas, propertyIds] = await Promise.all([
      getAreas(),
      getPropertyIds(),
    ]);
    areaRoutes = areas.map((a) => `/areas/${a.id}`);
    // Cap sitemap size for build stability; remaining pages remain crawlable via links
    propertyRoutes = propertyIds.slice(0, 500).map((id) => `/properties/${id}`);
  } catch {
    // sitemap still emits static routes if API is temporarily unavailable
  }

  return [...staticRoutes, ...areaRoutes, ...propertyRoutes].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/properties/") || route.startsWith("/areas/")
          ? 0.9
          : 0.8,
  }));
}
