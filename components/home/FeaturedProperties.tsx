import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Property } from "@/services/modules/property";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-ivory pt-10 pb-[var(--section)] md:pt-12"
      aria-labelledby="featured-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-champagne/20 blur-3xl"
        aria-hidden
      />
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Available now"
            title="Featured spaces"
            description="Hand-picked from live inventory — with photos when available."
          />
          <Link
            href="/properties"
            className="btn-primary font-ui inline-flex shrink-0 items-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
          >
            View all properties
          </Link>
        </div>

        {properties.length === 0 ? (
          <p className="mt-10 text-center text-text-muted">
            No featured listings available right now.{" "}
            <Link href="/properties" className="text-gold underline">
              Browse all properties
            </Link>
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
