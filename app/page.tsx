import {
  Hero,
  TrustBar,
  FeaturedLocations,
  FeaturedProperties,
  WhyChooseUs,
  PropertyTypes,
  Stats,
  FAQ,
  CTA,
} from "@/components/home";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { getAmenities } from "@/services/modules/amenities";
import { getAreas } from "@/services/modules/areas";
import {
  getFeaturedProperties,
  getProperties,
} from "@/services/modules/property";
import { getPropertyTypes } from "@/services/modules/property-types";

export const revalidate = 120;

const HOME_FAQS = [
  {
    id: "1",
    question: "What types of spaces do you list?",
    answer:
      "Furnished offices, semi-furnished, bareshell, retail, shops, godowns, and restaurant spaces across Delhi NCR.",
  },
  {
    id: "2",
    question: "How do I schedule a visit?",
    answer:
      "Open any listing and submit an enquiry, or use the Contact page with your preferred area and timeline.",
  },
];

export default async function HomePage() {
  const [areas, types, amenities, allProperties, featured] = await Promise.all([
    getAreas(),
    getPropertyTypes(),
    getAmenities(),
    getProperties({ status: "available" }),
    getFeaturedProperties(6),
  ]);

  const areaCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};
  const areaCovers: Record<string, string> = {};
  const typeCovers: Record<string, string> = {};

  for (const p of allProperties) {
    areaCounts[p.areaId] = (areaCounts[p.areaId] ?? 0) + 1;
    typeCounts[p.propertyTypeId] = (typeCounts[p.propertyTypeId] ?? 0) + 1;
    if (p.primaryPhoto) {
      if (!areaCovers[p.areaId]) areaCovers[p.areaId] = p.primaryPhoto;
      if (!typeCovers[p.propertyTypeId]) {
        typeCovers[p.propertyTypeId] = p.primaryPhoto;
      }
    }
  }

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
    faqSchema(HOME_FAQS),
    breadcrumbSchema([{ name: "Home", url: SITE.url }]),
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

      <main id="main-content">
        <Hero
          areas={areas}
          propertyTypes={types}
        />
        <TrustBar
          propertyCount={allProperties.length}
          areaCount={areas.length}
          typeCount={types.length}
        />
        <FeaturedLocations
          areas={areas}
          counts={areaCounts}
          covers={areaCovers}
        />
        <FeaturedProperties properties={featured} />
        <WhyChooseUs />
        <PropertyTypes
          types={types}
          counts={typeCounts}
          covers={typeCovers}
        />
        <Stats
          propertyCount={allProperties.length}
          areaCount={areas.length}
          typeCount={types.length}
          amenityCount={amenities.length}
        />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
