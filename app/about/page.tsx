import type { Metadata } from "next";
import {
  AboutHero,
  AboutStory,
  AboutValues,
  AboutTimeline,
  AboutTeam,
  AboutStats,
  AboutAwards,
  AboutCTA,
} from "@/components/about";
import { ABOUT } from "@/constants/about";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: ABOUT.metaTitle,
  description: ABOUT.metaDescription,
  keywords: [...ABOUT.keywords],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: `${SITE.url}/about`,
    siteName: SITE.name,
    title: ABOUT.metaTitle,
    description: ABOUT.metaDescription,
    images: [
      {
        url: ABOUT.heroImage,
        width: 1200,
        height: 630,
        alt: "About SK Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT.metaTitle,
    description: ABOUT.metaDescription,
    images: [ABOUT.heroImage],
  },
};

export default function AboutPage() {
  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "About", url: `${SITE.url}/about` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: ABOUT.metaTitle,
      description: ABOUT.metaDescription,
      url: `${SITE.url}/about`,
      mainEntity: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
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

      <main id="main-content">
        <AboutHero image={ABOUT.heroImage} intro={ABOUT.intro} />
        <AboutStory image={ABOUT.storyImage} story={ABOUT.story} />
        <AboutValues
          mission={ABOUT.mission}
          vision={ABOUT.vision}
          values={ABOUT.values}
        />
        <AboutTimeline timeline={ABOUT.timeline} />
        <AboutTeam team={ABOUT.team} />
        <AboutStats />
        <AboutAwards awards={ABOUT.awards} />
        <AboutCTA />
      </main>
    </>
  );
}
