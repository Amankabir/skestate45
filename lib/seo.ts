import { SITE } from "@/constants/site";
import type { FAQItem } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/og-image.svg`,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: Object.values(SITE.social),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/og-image.svg`,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4595,
      longitude: 77.0266,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/properties?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function placeSchema(area: {
  name: string;
  description: string;
  url: string;
  image: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: area.name,
    description: area.description,
    url: area.url,
    image: area.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: area.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.lat,
      longitude: area.lng,
    },
  };
}

export function realEstateListingSchema(area: {
  name: string;
  description: string;
  url: string;
  image: string;
  propertyCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `Properties in ${area.name}`,
    description: area.description,
    url: area.url,
    image: area.image,
    numberOfRooms: area.propertyCount,
  };
}

export function projectSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  builder: string;
  priceFrom: number;
  currency?: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    brand: {
      "@type": "Organization",
      name: project.builder,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: project.address,
      addressLocality: project.city,
      addressRegion: project.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.lat,
      longitude: project.lng,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: project.currency ?? "INR",
      price: project.priceFrom,
      availability: "https://schema.org/InStock",
    },
  };
}

export function projectListingSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: project.priceFrom,
    },
  };
}
