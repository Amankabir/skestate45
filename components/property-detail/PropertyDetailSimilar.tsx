"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { PropertyDetail } from "@/types";

interface Props {
  items: PropertyDetail[];
}

export function PropertyDetailSimilar({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Similar Homes"
          title="You may also like"
          description="Comparable residences from our curated collection."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group block overflow-hidden rounded-2xl bg-pearl shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-ui text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                    {p.type}
                  </p>
                  <h3 className="font-display mt-1 text-lg text-navy transition group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{p.location}</p>
                  <p className="font-display mt-2 text-base text-navy">
                    {p.priceLabel}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
