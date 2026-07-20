import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedLocations } from "@/components/home/FeaturedLocations";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PropertyTypes } from "@/components/home/PropertyTypes";
import { Projects } from "@/components/home/Projects";
import { Investment } from "@/components/home/Investment";
import { VideoSection } from "@/components/home/VideoSection";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";
import { Blogs } from "@/components/home/Blogs";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { FAQS } from "@/constants/content";
import { SITE } from "@/constants/site";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

export default function HomePage() {
  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
    faqSchema(FAQS),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
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
        <Hero />
        <TrustBar />
        <FeaturedLocations />
        <FeaturedProperties />
        <WhyChooseUs />
        <PropertyTypes />
        <Projects />
        <Investment />
        <VideoSection />
        <Testimonials />
        <Stats />
        <Blogs />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
