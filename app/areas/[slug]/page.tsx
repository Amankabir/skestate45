import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Breadcrumb } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SITE } from "@/constants/site";
import { ApiError } from "@/services/api";
import { getAreaById } from "@/services/modules/areas";
import { getProperties } from "@/services/modules/property";

export const revalidate = 120;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const area = await getAreaById(slug);
    return {
      title: `${area.name} Commercial Properties | ${SITE.name}`,
      description: `Browse available commercial spaces in ${area.name}, Delhi NCR.`,
      alternates: { canonical: `/areas/${area.id}` },
    };
  } catch {
    return { title: "Area not found" };
  }
}

export default async function AreaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let area;
  try {
    area = await getAreaById(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const properties = await getProperties({
    areaId: area.id,
    status: "available",
  });

  return (
    <main id="main-content" className="bg-ivory pb-20">
      <section className="on-dark bg-navy-deep pt-28 pb-14">
        <div className="container-luxury">
          <Breadcrumb
            className="text-pearl/60 [&_span]:text-pearl"
            items={[
              { label: "Home", href: "/" },
              { label: "Areas", href: "/areas" },
              { label: area.name },
            ]}
          />
          <h1 className="font-display mt-6 text-4xl text-pearl md:text-6xl">
            {area.name}
          </h1>
          <p className="mt-4 text-pearl/75">
            {properties.length} available{" "}
            {properties.length === 1 ? "listing" : "listings"} in this area.
          </p>
          <Link
            href={`/properties?areaId=${area.id}`}
            className="font-ui mt-6 inline-block text-xs uppercase tracking-[0.14em] text-champagne hover:text-gold"
          >
            Open in search →
          </Link>
        </div>
      </section>

      <section className="container-luxury mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.7fr]">
        <div>
          {properties.length === 0 ? (
            <EmptyState
              title="No available listings"
              description="Check back soon or browse nearby areas."
              action={
                <Link
                  href="/properties"
                  className="font-ui rounded-full bg-navy px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl"
                >
                  All properties
                </Link>
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {properties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <EnquiryForm
            pageUrl={`${SITE.url}/areas/${area.id}`}
            title={`Enquire — ${area.name}`}
            subtitle="Tell us your size and budget for this locality."
          />
        </div>
      </section>
    </main>
  );
}
