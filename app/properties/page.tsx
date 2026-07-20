import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { PropertyListing } from "@/components/properties/PropertyListing";
import { SITE } from "@/constants/site";
import { PROPERTY_LISTINGS } from "@/constants/properties";

export const metadata: Metadata = {
  title: "Luxury Properties for Sale & Rent | SK Estate",
  description:
    "Browse curated luxury apartments, villas, and penthouses across Gurugram, Dwarka, Mumbai, Bengaluru, and Goa. Filter by budget, type, and bedrooms.",
  keywords: [
    "luxury properties India",
    "apartments for sale Gurugram",
    "villas Mumbai",
    "property in Dwarka",
    "SK Estate listings",
  ],
  alternates: { canonical: "/properties" },
  openGraph: {
    title: `Luxury Properties | ${SITE.name}`,
    description:
      "Curated residences across India's most coveted addresses — filter and find your next home.",
    url: `${SITE.url}/properties`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Luxury properties by SK Estate",
      },
    ],
  },
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=85";

export default function PropertiesPage() {
  return (
    <main id="main-content">
      <section className="on-dark relative flex min-h-[50svh] items-end overflow-hidden bg-navy-deep md:min-h-[58svh]">
        <Image
          src={HERO_IMAGE}
          alt="Luxury residences available with SK Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/45 via-navy-deep/40 to-navy-deep/88" />
        <div className="container-luxury relative z-10 pb-12 pt-28 md:pb-16">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Residences
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl text-pearl md:text-6xl">
            Find your next address
          </h1>
          <p className="mt-4 max-w-xl text-base text-pearl/75 md:text-lg">
            {PROPERTY_LISTINGS.length}+ curated homes — filter by city, type,
            budget, and bedrooms.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ivory pt-10 md:pt-14">
        <Suspense
          fallback={
            <div className="container-luxury py-20 text-center text-text-muted">
              Loading residences…
            </div>
          }
        >
          <PropertyListing />
        </Suspense>
      </section>
    </main>
  );
}
