"use client";

import { FormEvent, useState } from "react";
import {
  Check,
  Phone,
  User,
  Calendar,
  MessageCircle,
  Download,
} from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/constants/site";
import type { PropertyDetail } from "@/types";

interface Props {
  property: PropertyDetail;
}

export function PropertyDetailBody({ property }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const specs = [
    { label: "Type", value: property.type },
    { label: "Bedrooms", value: String(property.beds) },
    { label: "Bathrooms", value: String(property.baths) },
    { label: "Area", value: `${property.area.toLocaleString()} sq.ft` },
    { label: "Facing", value: property.facing ?? "—" },
    { label: "Furnishing", value: property.furnishing ?? "—" },
    { label: "Parking", value: property.parking ?? "—" },
    { label: "Floor", value: property.floor ?? "—" },
    { label: "Age / Status", value: property.age ?? property.status ?? "—" },
    {
      label: "Intent",
      value: property.intent === "rent" ? "Rent" : "Sale",
    },
  ];

  return (
    <section className="section-pad bg-ivory">
      <div className="container-luxury">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="space-y-14">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="About this residence"
                description={property.overview}
              />
              <ul className="mt-8 space-y-3">
                {property.highlights.map((h, i) => (
                  <FadeIn key={h} delay={i * 0.05} direction="left">
                    <li className="flex items-start gap-3 rounded-xl bg-pearl px-4 py-3 text-sm text-navy shadow-[var(--shadow-soft)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {h}
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading
                eyebrow="Amenities"
                title="What comes with the home"
              />
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((a, i) => (
                  <FadeIn key={a} delay={i * 0.04}>
                    <div className="rounded-xl border border-soft-gray bg-pearl px-4 py-3 text-sm text-navy">
                      {a}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {property.floorPlanImage && (
              <div>
                <SectionHeading
                  eyebrow="Floor Plan"
                  title="Layout at a glance"
                />
                <FadeIn delay={0.1}>
                  <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-soft-gray bg-pearl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.floorPlanImage}
                      alt={`${property.title} floor plan`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </FadeIn>
              </div>
            )}

            <div>
              <SectionHeading
                eyebrow="Location"
                title="Nearby conveniences"
                description={`Connected living around ${property.location}.`}
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {property.nearby.map((n, i) => (
                  <FadeIn key={n.name} delay={i * 0.06}>
                    <article className="rounded-xl border border-soft-gray bg-pearl p-4">
                      <p className="font-ui text-[0.6rem] uppercase tracking-[0.16em] text-gold">
                        {n.type}
                      </p>
                      <h3 className="font-display mt-1 text-lg text-navy">
                        {n.name}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {n.distance}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-soft-gray">
                <iframe
                  title={`Map of ${property.title}`}
                  src={`https://maps.google.com/maps?q=${property.mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="h-64 w-full md:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-soft-gray bg-pearl p-6 shadow-[var(--shadow-soft)]">
              <p className="font-display text-3xl text-navy">
                {property.priceLabel}
              </p>
              <p className="font-ui mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">
                {property.type} · {property.city}
              </p>

              <dl className="mt-6 space-y-3 border-t border-soft-gray pt-5">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <dt className="text-text-muted">{s.label}</dt>
                    <dd className="font-medium text-navy">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-2">
                <MagneticButton
                  as="a"
                  href={`/contact?property=${property.slug}&intent=visit`}
                  className="btn-gold w-full rounded-full"
                >
                  <Calendar className="h-4 w-4" />
                  Book Site Visit
                </MagneticButton>
                <a
                  href={SITE.phoneHref}
                  className="font-ui flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 py-3 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
                >
                  <Phone className="h-4 w-4" /> Call Concierge
                </a>
                <a
                  href={SITE.whatsapp}
                  className="font-ui flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 py-3 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`/brochure?property=${property.slug}`}
                  className="font-ui flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 py-3 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
                >
                  <Download className="h-4 w-4" /> Brochure
                </a>
              </div>

              <form
                onSubmit={onSubmit}
                className="mt-6 space-y-3 border-t border-soft-gray pt-6"
              >
                <p className="font-display text-lg text-navy">
                  Request a callback
                </p>
                {sent ? (
                  <p className="text-sm text-emerald" role="status">
                    Thank you — we&apos;ll call you shortly about{" "}
                    {property.title}.
                  </p>
                ) : (
                  <>
                    <label className="flex items-center gap-2 rounded-full border border-soft-gray bg-warm-white px-4 py-2.5">
                      <User className="h-4 w-4 text-gold" />
                      <span className="sr-only">Name</span>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="font-ui w-full bg-transparent text-sm outline-none"
                      />
                    </label>
                    <label className="flex items-center gap-2 rounded-full border border-soft-gray bg-warm-white px-4 py-2.5">
                      <Phone className="h-4 w-4 text-gold" />
                      <span className="sr-only">Phone</span>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className="font-ui w-full bg-transparent text-sm outline-none"
                      />
                    </label>
                    <button
                      type="submit"
                      className="btn-primary w-full rounded-full"
                    >
                      Request Callback
                    </button>
                  </>
                )}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
