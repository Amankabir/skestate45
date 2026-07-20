import type { Property } from "@/types";

/** Full property catalogue for listing page — CMS/API ready */
export const PROPERTY_LISTINGS: Property[] = [
  {
    id: "aurelia-penthouse",
    title: "Aurelia Sky Penthouse",
    location: "Golf Course Road, Gurugram",
    city: "Gurugram",
    price: 125000000,
    priceLabel: "₹12.5 Cr",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: 6200,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
    ],
    badge: "Exclusive",
    featured: true,
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/aurelia-penthouse",
  },
  {
    id: "marina-villa",
    title: "Marina Crest Villa",
    location: "Juhu, Mumbai",
    city: "Mumbai",
    price: 280000000,
    priceLabel: "₹28 Cr",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: 9800,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=80",
    ],
    badge: "Waterfront",
    featured: true,
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/marina-villa",
  },
  {
    id: "orchid-estate",
    title: "Orchid Grove Estate",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    price: 89000000,
    priceLabel: "₹8.9 Cr",
    type: "Luxury Home",
    beds: 4,
    baths: 4,
    area: 5400,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
    ],
    badge: "New",
    featured: true,
    intent: "buy",
    status: "Under Construction",
    href: "/properties/orchid-estate",
  },
  {
    id: "casa-serena",
    title: "Casa Serena",
    location: "Anjuna, Goa",
    city: "Goa",
    price: 65000000,
    priceLabel: "₹6.5 Cr",
    type: "Villa",
    beds: 3,
    baths: 4,
    area: 4100,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1400&q=80",
    ],
    badge: "Retreat",
    featured: true,
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/casa-serena",
  },
  {
    id: "dwarka-skyline",
    title: "Skyline Residences",
    location: "Sector 19B, Dwarka",
    city: "Dwarka",
    price: 18500000,
    priceLabel: "₹1.85 Cr",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: 1650,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1400&q=80",
    ],
    badge: "Featured",
    featured: true,
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/dwarka-skyline",
  },
  {
    id: "dwarka-orchid",
    title: "Orchid Court",
    location: "Sector 12, Dwarka",
    city: "Dwarka",
    price: 24200000,
    priceLabel: "₹2.42 Cr",
    type: "Apartment",
    beds: 4,
    baths: 4,
    area: 2100,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    ],
    badge: "Premium",
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/dwarka-orchid",
  },
  {
    id: "dwarka-emerald",
    title: "Emerald Heights",
    location: "Sector 6, Dwarka",
    city: "Dwarka",
    price: 12800000,
    priceLabel: "₹1.28 Cr",
    type: "Apartment",
    beds: 3,
    baths: 2,
    area: 1420,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1400&q=80",
    ],
    badge: "Value Pick",
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/dwarka-emerald",
  },
  {
    id: "dwarka-palace",
    title: "Palace View Penthouse",
    location: "Sector 18A, Dwarka",
    city: "Dwarka",
    price: 45000000,
    priceLabel: "₹4.50 Cr",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: 3800,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
    ],
    badge: "Exclusive",
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/dwarka-palace",
  },
  {
    id: "dlf-crest",
    title: "The Crest Residences",
    location: "DLF Phase 5, Gurugram",
    city: "Gurugram",
    price: 72000000,
    priceLabel: "₹7.2 Cr",
    type: "Apartment",
    beds: 4,
    baths: 4,
    area: 3200,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    ],
    badge: "Premium",
    intent: "buy",
    status: "Under Construction",
    href: "/properties/dlf-crest",
  },
  {
    id: "saket-suite",
    title: "Saket Garden Suite",
    location: "Saket, South Delhi",
    city: "Delhi",
    price: 55000000,
    priceLabel: "₹5.5 Cr",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: 2400,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
    ],
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/saket-suite",
  },
  {
    id: "worli-sea",
    title: "Worli Sea Residences",
    location: "Worli, Mumbai",
    city: "Mumbai",
    price: 185000000,
    priceLabel: "₹18.5 Cr",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: 5200,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    ],
    badge: "Sea View",
    featured: true,
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/worli-sea",
  },
  {
    id: "koramangala-loft",
    title: "Koramangala Loft Home",
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    price: 42000000,
    priceLabel: "₹4.2 Cr",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: 2100,
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
    ],
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/koramangala-loft",
  },
  {
    id: "candolim-villa",
    title: "Candolim Palm Villa",
    location: "Candolim, Goa",
    city: "Goa",
    price: 38000000,
    priceLabel: "₹3.8 Cr",
    type: "Villa",
    beds: 3,
    baths: 3,
    area: 2800,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1400&q=80",
    ],
    badge: "Coastal",
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/candolim-villa",
  },
  {
    id: "gurgaon-rent-1",
    title: "Cyber Hub Serviced Apartment",
    location: "DLF Cyber City, Gurugram",
    city: "Gurugram",
    price: 185000,
    priceLabel: "₹1.85 L/mo",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: 1950,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
    ],
    badge: "Rent",
    intent: "rent",
    status: "Available",
    href: "/properties/gurgaon-rent-1",
  },
  {
    id: "mumbai-rent-1",
    title: "Bandra West Furnished Flat",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    price: 275000,
    priceLabel: "₹2.75 L/mo",
    type: "Apartment",
    beds: 2,
    baths: 2,
    area: 1250,
    images: [
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
    ],
    badge: "Rent",
    intent: "rent",
    status: "Available",
    href: "/properties/mumbai-rent-1",
  },
  {
    id: "builder-floor-delhi",
    title: "Vasant Vihar Builder Floor",
    location: "Vasant Vihar, South Delhi",
    city: "Delhi",
    price: 95000000,
    priceLabel: "₹9.5 Cr",
    type: "Builder Floor",
    beds: 4,
    baths: 4,
    area: 3600,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
    ],
    intent: "buy",
    status: "Ready to Move",
    href: "/properties/builder-floor-delhi",
  },
];

export const FILTER_CITIES = [
  "Gurugram",
  "Dwarka",
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Goa",
] as const;

export const FILTER_TYPES = [
  "Apartment",
  "Villa",
  "Penthouse",
  "Luxury Home",
  "Builder Floor",
] as const;

export const FILTER_BEDS = [2, 3, 4, 5] as const;

export const PRICE_RANGES = [
  { id: "any", label: "Any Budget", min: 0, max: Infinity },
  { id: "under-2", label: "Under ₹2 Cr", min: 0, max: 20000000 },
  { id: "2-5", label: "₹2 – 5 Cr", min: 20000000, max: 50000000 },
  { id: "5-10", label: "₹5 – 10 Cr", min: 50000000, max: 100000000 },
  { id: "10-25", label: "₹10 – 25 Cr", min: 100000000, max: 250000000 },
  { id: "25-plus", label: "₹25 Cr+", min: 250000000, max: Infinity },
] as const;

export type PropertySort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "area-desc"
  | "newest";

export interface PropertyFiltersState {
  q: string;
  cities: string[];
  types: string[];
  beds: number[];
  intent: "all" | "buy" | "rent";
  priceRange: string;
  sort: PropertySort;
}

export const DEFAULT_FILTERS: PropertyFiltersState = {
  q: "",
  cities: [],
  types: [],
  beds: [],
  intent: "all",
  priceRange: "any",
  sort: "featured",
};

export function filterProperties(
  list: Property[],
  filters: PropertyFiltersState
): Property[] {
  const range =
    PRICE_RANGES.find((r) => r.id === filters.priceRange) ?? PRICE_RANGES[0];

  let result = list.filter((p) => {
    if (filters.intent !== "all" && (p.intent ?? "buy") !== filters.intent) {
      return false;
    }
    if (filters.cities.length && !filters.cities.includes(p.city)) {
      return false;
    }
    if (filters.types.length && !filters.types.includes(p.type)) {
      return false;
    }
    if (filters.beds.length && !filters.beds.includes(p.beds)) {
      return false;
    }
    // Skip rentals from Cr price ranges when filtering buy budgets on rent items
    if (filters.intent !== "rent" && (p.intent ?? "buy") === "buy") {
      if (p.price < range.min || p.price > range.max) return false;
    }
    if (filters.intent === "rent" && (p.intent ?? "buy") === "rent") {
      // For rent, treat priceRange loosely or skip Cr filters
      if (filters.priceRange !== "any" && filters.priceRange !== "under-2") {
        // monthly rents are small numbers — only apply when intent is rent with any
      }
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const hay = `${p.title} ${p.location} ${p.city} ${p.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "area-desc":
      result = [...result].sort((a, b) => b.area - a.area);
      break;
    case "newest":
      result = [...result].reverse();
      break;
    default:
      result = [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
  }

  return result;
}
