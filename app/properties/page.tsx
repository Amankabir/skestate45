import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyListing } from "@/components/properties/PropertyListing";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE } from "@/constants/site";
import { safeList } from "@/services/modules/common/safe";
import { getAmenities } from "@/services/modules/amenities";
import { getAreas } from "@/services/modules/areas";
import { getProperties } from "@/services/modules/property";
import { getPropertyTypes } from "@/services/modules/property-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Commercial Properties for Rent | SK Estate",
  description:
    "Browse available offices, retail, shops, and commercial spaces across Delhi NCR. Filter by area, type, budget, and amenities.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: `Properties | ${SITE.name}`,
    description:
      "Live commercial inventory — filter by area, type, rent, and size.",
    url: `${SITE.url}/properties`,
  },
};

export default async function PropertiesPage() {
  const [areas, propertyTypes, amenities, available] = await Promise.all([
    safeList("getAreas", getAreas),
    safeList("getPropertyTypes", getPropertyTypes),
    safeList("getAmenities", getAmenities),
    safeList("getProperties", () => getProperties({ status: "available" })),
  ]);

  return (
    <main id="main-content">
      <section className="on-dark relative flex min-h-[42svh] items-end overflow-hidden bg-navy-deep md:min-h-[48svh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,151,90,0.2),transparent_55%)]" />
        <div className="container-luxury relative z-10 pb-12 pt-28 md:pb-16">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Properties
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl text-pearl md:text-6xl">
            Find your next space
          </h1>
          <p className="mt-4 max-w-xl text-base text-pearl/75 md:text-lg">
            {available.length} available listings — filter by area, type,
            budget, size, and amenities.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ivory pt-10 md:pt-14">
        <Suspense fallback={<LoadingSkeleton className="container-luxury" />}>
          <PropertyListing
            options={{ areas, propertyTypes, amenities }}
          />
        </Suspense>
      </section>
    </main>
  );
}
