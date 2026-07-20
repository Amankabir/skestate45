import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailView } from "@/components/property-detail/PropertyDetailView";
import { SITE } from "@/constants/site";
import { formatSqFeet, PROPERTY_PLACEHOLDER } from "@/lib/format";
import {
  breadcrumbSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/seo";
import { ApiError } from "@/services/api";
import { safeList } from "@/services/modules/common/safe";
import {
  getPropertyById,
  getRelatedProperties,
} from "@/services/modules/property";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getPropertyById(slug);
    const title = `${property.name} | ${property.areaName} | ${SITE.name}`;
    const description =
      property.description ||
      `${property.propertyTypeName} in ${property.areaName} — ${formatSqFeet(property.sqFeet)}, ${property.rent != null ? `₹${property.rent.toLocaleString("en-IN")}/mo` : "price on request"}.`;
    const image = property.primaryPhoto || `${SITE.url}/og-image.svg`;

    return {
      title,
      description,
      alternates: { canonical: `/properties/${property.id}` },
      openGraph: {
        title,
        description,
        url: `${SITE.url}/properties/${property.id}`,
        images: [{ url: image, alt: property.name }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Property not found" };
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let property;
  try {
    property = await getPropertyById(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const related = await safeList("getRelatedProperties", () =>
    getRelatedProperties(property, 3),
  );
  const pageUrl = `${SITE.url}/properties/${property.id}`;

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "Properties", url: `${SITE.url}/properties` },
      { name: property.name, url: pageUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.name,
      description: property.description,
      url: pageUrl,
      image: property.photos.length ? property.photos : [PROPERTY_PLACEHOLDER],
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.areaName,
        addressCountry: "IN",
      },
      ...(property.rent != null
        ? {
            offers: {
              "@type": "Offer",
              price: property.rent,
              priceCurrency: "INR",
              availability: property.isAvailable
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }
        : {}),
    },
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
      <PropertyDetailView
        property={property}
        related={related}
        pageUrl={pageUrl}
      />
    </>
  );
}
