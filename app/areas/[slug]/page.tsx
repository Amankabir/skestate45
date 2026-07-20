import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AreaHero,
  AreaAbout,
  AreaHighlights,
  AreaProperties,
  AreaPriceTrends,
  AreaInvestment,
  AreaNearby,
  AreaBuilders,
  AreaAmenities,
  AreaMap,
  AreaGallery,
  AreaVideo,
  AreaTestimonials,
  AreaBlogs,
  AreaFAQ,
  AreaLeadCTA,
} from "@/components/areas";
import { getAllAreaSlugs, getAreaBySlug } from "@/lib/areas";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  placeSchema,
  realEstateListingSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: "Area Not Found" };

  const url = `${SITE.url}/areas/${area.slug}`;

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: area.metaTitle,
      description: area.metaDescription,
      images: [
        {
          url: area.heroImage,
          width: 1200,
          height: 630,
          alt: `Luxury property in ${area.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
      images: [area.heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const pageUrl = `${SITE.url}/areas/${area.slug}`;

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    placeSchema({
      name: area.name,
      description: area.metaDescription,
      url: pageUrl,
      image: area.heroImage,
      city: area.city,
      state: area.state,
      lat: area.geo.lat,
      lng: area.geo.lng,
    }),
    realEstateListingSchema({
      name: area.name,
      description: area.metaDescription,
      url: pageUrl,
      image: area.heroImage,
      propertyCount: area.propertyCount,
    }),
    faqSchema(area.faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "Areas", url: `${SITE.url}/areas` },
      { name: area.name, url: pageUrl },
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

      <main id="main-content">
        <AreaHero area={area} />
        <AreaAbout
          areaName={area.name}
          intro={area.aboutIntro}
          sections={area.aboutSections}
        />
        <AreaHighlights areaName={area.name} highlights={area.highlights} />
        <AreaProperties
          areaName={area.name}
          areaSlug={area.slug}
          properties={area.properties}
        />
        <AreaPriceTrends
          areaName={area.name}
          trends={area.priceTrends}
          metrics={area.priceMetrics}
        />
        <AreaInvestment
          areaName={area.name}
          intro={area.investmentIntro}
          points={area.investmentPoints}
        />
        <AreaNearby areas={area.nearbyAreas} />
        <AreaBuilders areaName={area.name} builders={area.builders} />
        <AreaAmenities areaName={area.name} amenities={area.amenities} />
        <AreaMap
          areaName={area.name}
          mapQuery={area.mapEmbedQuery}
          travelTimes={area.travelTimes}
        />
        <AreaGallery areaName={area.name} images={area.gallery} />
        <AreaVideo
          areaName={area.name}
          poster={area.videoPoster}
          videoUrl={area.videoUrl}
        />
        <AreaTestimonials
          areaName={area.name}
          testimonials={area.testimonials}
        />
        <AreaBlogs areaName={area.name} blogs={area.blogs} />
        <AreaFAQ areaName={area.name} faqs={area.faqs} />
        <AreaLeadCTA
          areaName={area.name}
          areaSlug={area.slug}
          image={area.heroImage}
        />
      </main>
    </>
  );
}
