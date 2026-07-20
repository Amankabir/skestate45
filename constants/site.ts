export const SITE = {
  name: "SK Estate",
  legalName: "SK Estate Private Limited",
  tagline: "Commercial spaces across Delhi NCR",
  description:
    "SK Estate helps businesses find furnished offices, retail, shops, and commercial spaces across Delhi NCR — with transparent pricing and dedicated leasing support.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.skestate45.com",
  locale: "en_IN",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "https://wa.me/919876543210",
  email: "hello@skestate45.com",
  address: {
    street: "Connaught Place",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110001",
    country: "IN",
  },
  social: {
    instagram: "https://instagram.com/skestate",
    linkedin: "https://linkedin.com/company/skestate",
    youtube: "https://youtube.com/@skestate",
    twitter: "https://x.com/skestate",
  },
  keywords: [
    "commercial office rent Delhi",
    "furnished office Connaught Place",
    "retail space Delhi NCR",
    "office leasing SK Estate",
    "shop for rent Delhi",
    "bareshell office Delhi",
  ],
} as const;

/** Fallback labels — live counts come from the API on the homepage */
export const STATS = [
  { id: "properties", label: "Listed spaces", value: 0, suffix: "+" },
  { id: "areas", label: "Micro-markets", value: 0, suffix: "" },
  { id: "types", label: "Property types", value: 0, suffix: "" },
  { id: "amenities", label: "Amenities", value: 0, suffix: "" },
] as const;

export const STATS_LABELS = [
  { id: "properties", label: "Listed spaces" },
  { id: "areas", label: "Micro-markets" },
  { id: "types", label: "Property types" },
  { id: "amenities", label: "Amenity filters" },
] as const;
