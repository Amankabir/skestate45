import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PropertyDetailHero,
  PropertyDetailBody,
  PropertyDetailFAQ,
  PropertyDetailSimilar,
  PropertyDetailStickyCTA,
} from "@/components/property-detail";
import {
  getAllPropertySlugs,
  getPropertyBySlug,
  getSimilarProperties,
} from "@/lib/properties";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  const url = `${SITE.url}/properties/${property.slug}`;

  return {
    title: property.metaTitle,
    description: property.metaDescription,
    keywords: property.keywords,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: property.metaTitle,
      description: property.metaDescription,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.metaTitle,
      description: property.metaDescription,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const similar = getSimilarProperties(slug);
  const pageUrl = `${SITE.url}/properties/${property.slug}`;

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    faqSchema(property.faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "Properties", url: `${SITE.url}/properties` },
      { name: property.title, url: pageUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Apartment",
      name: property.title,
      description: property.metaDescription,
      url: pageUrl,
      image: property.images,
      numberOfRooms: property.beds,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.area,
        unitCode: "FTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city,
        streetAddress: property.location,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: property.geo.lat,
        longitude: property.geo.lng,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: property.price,
        availability: "https://schema.org/InStock",
      },
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

      <main id="main-content" className="pb-20 md:pb-24">
        <PropertyDetailHero property={property} />
        <PropertyDetailBody property={property} />
        <PropertyDetailFAQ title={property.title} faqs={property.faqs} />
        <PropertyDetailSimilar items={similar} />
      </main>

      <PropertyDetailStickyCTA
        title={property.title}
        slug={property.slug}
        priceLabel={property.priceLabel}
      />
    </>
  );
}
