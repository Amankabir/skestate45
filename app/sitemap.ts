import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getAllAreaSlugs } from "@/lib/areas";
import { getAllProjectSlugs } from "@/lib/projects";
import { getAllPropertySlugs } from "@/lib/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/properties",
    "/projects",
    "/locations",
    "/areas",
    "/blog",
    "/about",
    "/contact",
  ];

  const areaRoutes = getAllAreaSlugs().map((slug) => `/areas/${slug}`);
  const projectRoutes = getAllProjectSlugs().map(
    (slug) => `/projects/${slug}`
  );
  const propertyRoutes = getAllPropertySlugs().map(
    (slug) => `/properties/${slug}`
  );

  return [...staticRoutes, ...areaRoutes, ...projectRoutes, ...propertyRoutes].map(
    (route) => ({
      url: `${SITE.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority:
        route === ""
          ? 1
          : route.startsWith("/projects/") ||
              route.startsWith("/areas/") ||
              route.startsWith("/properties/")
            ? 0.9
            : 0.8,
    })
  );
}
