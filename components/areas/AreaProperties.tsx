"use client";

import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Property } from "@/services/modules/property";

interface AreaPropertiesProps {
  areaName: string;
  areaSlug: string;
  properties: Property[];
}

export function AreaProperties({
  areaName,
  areaSlug,
  properties,
}: AreaPropertiesProps) {
  return (
    <section
      id="properties"
      className="section-pad bg-ivory"
      aria-labelledby="area-properties-heading"
    >
      <div className="container-luxury">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Properties"
            title={`Homes in ${areaName}`}
            description={`Hand-selected apartments and residences across ${areaName}'s most desirable sectors.`}
          />
          <FadeIn delay={0.15}>
            <MagneticButton
              as="a"
              href={`/properties?area=${areaSlug}`}
              className="btn-primary rounded-full"
            >
              View All in {areaName}
            </MagneticButton>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-10 text-center text-sm text-text-muted">
            Looking for something specific?{" "}
            <Link
              href={`/contact?area=${areaSlug}`}
              className="text-gold underline-offset-4 transition hover:underline"
            >
              Tell our advisors
            </Link>{" "}
            — including off-market inventory.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
