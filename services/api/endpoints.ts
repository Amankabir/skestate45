export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "https://api.skestate45.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.skestate45.com";

export const API_TIMEOUT_MS = 30_000;

export const IS_DEV = process.env.NODE_ENV === "development";

/** Website public API paths (Postman: HG API Website / Public) */
export const ENDPOINTS = {
  health: "/health",
  areas: {
    list: "/api/website/areas",
    byId: (id: string) => `/api/website/areas/${id}`,
  },
  amenities: {
    list: "/api/website/amenities",
    byId: (id: string) => `/api/website/amenities/${id}`,
  },
  propertyTypes: {
    list: "/api/website/property-types",
    byId: (id: string) => `/api/website/property-types/${id}`,
  },
  properties: {
    list: "/api/website/properties",
    byId: (id: string) => `/api/website/properties/${id}`,
  },
  enquiries: {
    create: "/api/website/enquiries",
  },
} as const;
