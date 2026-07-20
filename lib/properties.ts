import { PROPERTY_LISTINGS } from "@/constants/properties";
import type { FAQItem, Property, PropertyDetail } from "@/types";

const CITY_GEO: Record<string, { lat: number; lng: number; map: string }> = {
  Gurugram: { lat: 28.4595, lng: 77.0266, map: "Golf%20Course%20Road%20Gurugram" },
  Dwarka: { lat: 28.5921, lng: 77.046, map: "Dwarka%20New%20Delhi" },
  Delhi: { lat: 28.5245, lng: 77.2066, map: "South%20Delhi" },
  Mumbai: { lat: 19.076, lng: 72.8777, map: "Juhu%20Mumbai" },
  Bengaluru: { lat: 12.9698, lng: 77.75, map: "Whitefield%20Bengaluru" },
  Goa: { lat: 15.5889, lng: 73.7432, map: "Anjuna%20Goa" },
};

const DEFAULT_AMENITIES = [
  "Clubhouse",
  "Swimming Pool",
  "Gym",
  "Landscaped Garden",
  "24×7 Security",
  "Power Backup",
  "Covered Parking",
  "Children's Play Area",
];

function defaultFaqs(p: Property): FAQItem[] {
  return [
    {
      id: "1",
      question: `What is the price of ${p.title}?`,
      answer: `${p.title} is listed at ${p.priceLabel}${p.intent === "rent" ? " per month" : ""}. Final commercial terms may vary based on floor, view, and negotiation. Request a callback for the latest quote.`,
    },
    {
      id: "2",
      question: "Can I schedule a site visit?",
      answer:
        "Yes. SK Estate arranges private viewings typically within 24–48 hours. Use Book Site Visit or WhatsApp to confirm a slot.",
    },
    {
      id: "3",
      question: "Is home loan assistance available?",
      answer:
        "We introduce preferred banking partners and assist with documentation for eligible buyers on this residence.",
    },
    {
      id: "4",
      question: "What is included in the listing?",
      answer: `This ${p.type.toLowerCase()} offers ${p.beds} bedrooms, ${p.baths} bathrooms, and approximately ${p.area.toLocaleString()} sq.ft. Furnishing and parking details are confirmed during the visit.`,
    },
  ];
}

const DETAIL_OVERRIDES: Partial<
  Record<string, Partial<PropertyDetail>>
> = {
  "aurelia-penthouse": {
    tagline: "Sky living above Golf Course Road",
    overview:
      "Aurelia Sky Penthouse is a rare dual-level residence crowning a landmark tower on Golf Course Road. Floor-to-ceiling glass, a private terrace, and interiors composed for light and calm define a home meant for those who collect space as carefully as art.",
    highlights: [
      "Dual-level penthouse with private terrace",
      "Panoramic Golf Course Road views",
      "Italian marble and bespoke joinery",
      "Smart home automation throughout",
      "Dedicated private elevator lobby",
    ],
    facing: "North-East",
    furnishing: "Semi-Furnished",
    parking: "3 Covered",
    floor: "Penthouse",
    age: "New Launch Fit-Out",
  },
  "marina-villa": {
    tagline: "Arabian Sea at your doorstep",
    overview:
      "Marina Crest Villa is a private waterfront estate in Juhu — five bedrooms of coastal luxury with landscaped lawns, a pool court, and interiors that open entirely to the sea breeze.",
    highlights: [
      "Direct sea-facing orientation",
      "Private pool and lawn",
      "Staff quarters and home office",
      "Double-height living pavilion",
    ],
    facing: "West",
    furnishing: "Fully Furnished",
    parking: "4 Covered",
    floor: "G+2 Villa",
    age: "Recently Renovated",
  },
  "dwarka-skyline": {
    tagline: "Calm, connected living in Sector 19B",
    overview:
      "Skyline Residences offers a refined 3 BHK in one of Dwarka's most sought-after sectors — wide balconies, park-facing views, and metro access that makes daily life effortless.",
    highlights: [
      "Park-facing living room",
      "Modular kitchen with utility",
      "Club access included",
      "Walking distance to metro",
    ],
    facing: "East",
    furnishing: "Semi-Furnished",
    parking: "1 Covered + 1 Open",
    floor: "12th Floor",
    age: "4 Years",
  },
};

function buildDetail(listing: Property): PropertyDetail {
  const slug = listing.id;
  const geo = CITY_GEO[listing.city] ?? CITY_GEO.Gurugram;
  const override = DETAIL_OVERRIDES[slug] ?? {};

  return {
    ...listing,
    slug,
    tagline:
      override.tagline ??
      `${listing.type} in ${listing.location} — curated by SK Estate`,
    overview:
      override.overview ??
      `${listing.title} is a ${listing.beds} BHK ${listing.type.toLowerCase()} in ${listing.location}, offering ${listing.area.toLocaleString()} sq.ft of thoughtfully planned living. ${listing.status ?? "Available"} and presented exclusively through SK Estate advisory.`,
    highlights: override.highlights ?? [
      `${listing.beds} bedrooms · ${listing.baths} bathrooms`,
      `${listing.area.toLocaleString()} sq.ft spacious layout`,
      `${listing.status ?? "Available"} in ${listing.city}`,
      "Private viewing with SK Estate concierge",
      "Verified documentation & advisory support",
    ],
    amenities: override.amenities ?? DEFAULT_AMENITIES,
    nearby: override.nearby ?? [
      { name: "Metro / Transit", distance: "1–3 km", type: "Metro" },
      { name: "Schools", distance: "2–4 km", type: "School" },
      { name: "Hospital", distance: "3–5 km", type: "Hospital" },
      { name: "Mall / Retail", distance: "2–6 km", type: "Mall" },
    ],
    floorPlanImage:
      override.floorPlanImage ??
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    videoUrl:
      override.videoUrl ??
      "https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&rel=0",
    mapQuery: override.mapQuery ?? geo.map,
    geo: override.geo ?? { lat: geo.lat, lng: geo.lng },
    facing: override.facing ?? "East",
    furnishing: override.furnishing ?? "Semi-Furnished",
    parking: override.parking ?? "Covered",
    floor: override.floor ?? "Mid Floor",
    age: override.age ?? "Ready",
    metaTitle: `${listing.title} | ${listing.type} in ${listing.city} — ${listing.priceLabel}`,
    metaDescription: `${listing.title} — ${listing.beds} BHK ${listing.type} in ${listing.location}. Listed at ${listing.priceLabel}. Book a private site visit with SK Estate.`,
    keywords: [
      listing.title,
      `${listing.type} in ${listing.city}`,
      `property in ${listing.city}`,
      listing.location,
      "SK Estate",
    ],
    faqs: override.faqs ?? defaultFaqs(listing),
  };
}

const DETAILS: Record<string, PropertyDetail> = Object.fromEntries(
  PROPERTY_LISTINGS.map((p) => [p.id, buildDetail(p)])
);

export function getAllPropertySlugs(): string[] {
  return PROPERTY_LISTINGS.map((p) => p.id);
}

export function getPropertyBySlug(slug: string): PropertyDetail | null {
  return DETAILS[slug] ?? null;
}

export function getSimilarProperties(
  slug: string,
  limit = 4
): PropertyDetail[] {
  const current = DETAILS[slug];
  if (!current) return [];
  return PROPERTY_LISTINGS.filter((p) => p.id !== slug)
    .filter(
      (p) =>
        p.city === current.city ||
        p.type === current.type ||
        (p.intent ?? "buy") === (current.intent ?? "buy")
    )
    .slice(0, limit)
    .map((p) => DETAILS[p.id]);
}

export async function fetchPropertyBySlug(
  slug: string
): Promise<PropertyDetail | null> {
  return getPropertyBySlug(slug);
}
