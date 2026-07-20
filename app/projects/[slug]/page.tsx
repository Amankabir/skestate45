import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProjectHero,
  ProjectGallery,
  ProjectOverview,
  ProjectPricing,
  ProjectFloorPlans,
  ProjectMasterPlan,
  ProjectAmenities,
  ProjectLocation,
  ProjectMap,
  ProjectBuilder,
  ProjectConstruction,
  ProjectPayment,
  ProjectInvestment,
  ProjectSimilar,
  ProjectReviews,
  ProjectFAQ,
  ProjectLead,
  ProjectStickyCTA,
} from "@/components/projects";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  projectListingSchema,
  projectSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const url = `${SITE.url}/projects/${project.slug}`;

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: project.metaTitle,
      description: project.metaDescription,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
      images: [project.heroImage],
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const pageUrl = `${SITE.url}/projects/${project.slug}`;

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    projectSchema({
      name: project.name,
      description: project.metaDescription,
      url: pageUrl,
      image: project.heroImage,
      builder: project.builder,
      priceFrom: project.startingPriceValue,
      address: project.address,
      city: project.city,
      state: project.state,
      lat: project.geo.lat,
      lng: project.geo.lng,
    }),
    projectListingSchema({
      name: project.name,
      description: project.metaDescription,
      url: pageUrl,
      image: project.heroImage,
      priceFrom: project.startingPriceValue,
    }),
    faqSchema(project.faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "Projects", url: `${SITE.url}/projects` },
      { name: project.name, url: pageUrl },
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

      <main id="main-content" className="pb-20 md:pb-24">
        <ProjectHero project={project} />
        <ProjectGallery
          projectName={project.name}
          items={project.gallery}
          videoUrl={project.videoUrl}
        />
        <ProjectOverview
          projectName={project.name}
          overview={project.overview}
          highlights={project.highlights}
          whyInvest={project.whyInvest}
        />
        <ProjectPricing
          projectName={project.name}
          projectSlug={project.slug}
          units={project.units}
          priceListUrl={project.priceListUrl}
        />
        <ProjectFloorPlans plans={project.floorPlans} />
        <ProjectMasterPlan
          projectName={project.name}
          image={project.masterPlanImage}
        />
        <ProjectAmenities amenities={project.amenities} />
        <ProjectLocation
          projectName={project.name}
          advantages={project.locationAdvantages}
        />
        <ProjectMap
          projectName={project.name}
          mapQuery={project.mapEmbedQuery}
          landmarks={project.landmarks}
        />
        <ProjectBuilder builder={project.builderProfile} />
        <ProjectConstruction milestones={project.construction} />
        <ProjectPayment plans={project.paymentPlans} />
        <ProjectInvestment metrics={project.investmentMetrics} />
        <ProjectSimilar projects={project.similarProjects} />
        <ProjectReviews testimonials={project.testimonials} />
        <ProjectFAQ projectName={project.name} faqs={project.faqs} />
        <ProjectLead
          projectName={project.name}
          projectSlug={project.slug}
          image={project.heroImage}
          brochureUrl={project.brochureUrl}
          startingPrice={project.startingPrice}
        />
      </main>

      <ProjectStickyCTA
        projectName={project.name}
        projectSlug={project.slug}
        brochureUrl={project.brochureUrl}
        startingPrice={project.startingPrice}
      />
    </>
  );
}
