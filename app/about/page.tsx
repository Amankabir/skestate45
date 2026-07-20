import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/AboutPageView";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/seo";
import { safeList } from "@/services/modules/common/safe";
import { getAmenities } from "@/services/modules/amenities";
import { getAreas } from "@/services/modules/areas";
import { getProperties } from "@/services/modules/property";
import { getPropertyTypes } from "@/services/modules/property-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | SK Estate",
  description: SITE.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${SITE.name}`,
    description: SITE.description,
    url: `${SITE.url}/about`,
  },
};

export default async function AboutPage() {
  const [areas, types, amenities, properties] = await Promise.all([
    safeList("getAreas", getAreas),
    safeList("getPropertyTypes", getPropertyTypes),
    safeList("getAmenities", getAmenities),
    safeList("getProperties", () => getProperties({ status: "available" })),
  ]);

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "About", url: `${SITE.url}/about` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AboutPageView
        propertyCount={properties.length}
        areaCount={areas.length}
        typeCount={types.length}
        amenityCount={amenities.length}
      />
    </>
  );
}
