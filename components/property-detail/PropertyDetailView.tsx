"use client";

import Link from "next/link";
import {
  MapPin,
  Maximize,
  Share2,
  Phone,
  CheckCircle2,
  Building2,
  FileText,
  Clock,
  Home,
  MessageCircle,
} from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Breadcrumb } from "@/components/ui/Pagination";
import { Gallery } from "@/components/ui/Gallery";
import { SITE } from "@/constants/site";
import { formatRent, formatSqFeet, formatStatus } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/services/modules/property";

interface PropertyDetailViewProps {
  property: Property;
  related: Property[];
  pageUrl: string;
}

function locationLine(property: Property): string {
  const addr = property.address?.trim() ?? "";
  const area = property.areaName?.trim() ?? "";
  if (!addr) return area;
  if (!area) return addr;
  if (addr.toLowerCase() === area.toLowerCase()) return area;
  if (addr.toLowerCase().includes(area.toLowerCase())) return addr;
  return `${addr}, ${area}`;
}

export function PropertyDetailView({
  property,
  related,
  pageUrl,
}: PropertyDetailViewProps) {
  const hasPhotos = property.photos.length > 0;
  const location = locationLine(property);
  const encoded = encodeURIComponent(pageUrl);
  const shareText = encodeURIComponent(
    `${property.name} — ${property.propertyTypeName} in ${property.areaName}`,
  );

  const facts = [
    {
      label: "Rent",
      value: formatRent(property.rent),
      Icon: Building2,
    },
    {
      label: "Area",
      value: formatSqFeet(property.sqFeet),
      Icon: Maximize,
    },
    {
      label: "Type",
      value: property.propertyTypeName,
      Icon: Home,
    },
    {
      label: "Status",
      value: formatStatus(property.status),
      Icon: CheckCircle2,
    },
  ];

  if (property.leaseTenureMonths != null) {
    facts.push({
      label: "Tenure",
      value: `${property.leaseTenureMonths} mo`,
      Icon: Clock,
    });
  }
  if (property.securityDeposit != null) {
    facts.push({
      label: "Deposit",
      value: `₹${property.securityDeposit.toLocaleString("en-IN")}`,
      Icon: FileText,
    });
  }

  return (
    <main id="main-content" className="bg-ivory pb-28 lg:pb-20">
      {/* Compact navy hero */}
      <section className="on-dark relative overflow-hidden bg-navy-deep pt-24 md:pt-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(184,151,90,0.18),transparent_45%)]"
          aria-hidden
        />
        <div className="container-luxury relative z-10 pb-8 md:pb-10">
          <Breadcrumb
            className="text-pearl/50 [&_span]:text-pearl/90"
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: property.areaName, href: `/areas/${property.areaId}` },
              { label: property.name },
            ]}
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-ui rounded-full bg-pearl/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-champagne">
                  {property.propertyTypeName}
                </span>
                <span
                  className={cn(
                    "font-ui rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.14em]",
                    property.isAvailable
                      ? "bg-emerald/25 text-emerald-soft"
                      : "bg-pearl/10 text-pearl/70",
                  )}
                >
                  {formatStatus(property.status)}
                </span>
              </div>

              <h1 className="font-display mt-4 text-3xl text-pearl md:text-5xl">
                {property.propertyTypeName}
                <span className="text-champagne"> in {property.areaName}</span>
              </h1>
              <p className="font-ui mt-2 text-sm text-pearl/55">
                Ref. {property.name}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-pearl/75 md:text-base">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                {location}
              </p>
            </div>

            <div className="rounded-2xl border border-pearl/15 bg-pearl/5 p-5 backdrop-blur-sm md:p-6">
              <p className="font-ui text-[0.6rem] uppercase tracking-[0.16em] text-champagne">
                Monthly rent
              </p>
              <p className="font-display mt-1 text-3xl text-pearl md:text-4xl">
                {formatRent(property.rent)}
              </p>
              <p className="mt-2 text-sm text-pearl/60">
                {formatSqFeet(property.sqFeet)}
                {property.sqFeet && property.rent
                  ? ` · ₹${Math.round(property.rent / property.sqFeet).toLocaleString("en-IN")}/sq.ft`
                  : ""}
              </p>
              <div className="mt-5 flex gap-2">
                <a
                  href={SITE.phoneHref}
                  className="font-ui inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-pearl/25 py-2.5 text-[0.65rem] uppercase tracking-[0.12em] text-pearl transition hover:border-gold hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-[0.65rem] uppercase tracking-[0.12em] text-navy-deep transition hover:bg-gold-light"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxury mt-8 md:mt-10">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10">
          <div className="min-w-0 space-y-6">
            {/* Photos: full gallery OR compact notice */}
            {hasPhotos ? (
              <FadeIn>
                <Gallery images={property.photos} alt={property.name} />
              </FadeIn>
            ) : (
              <FadeIn>
                <div className="relative overflow-hidden rounded-3xl border border-soft-gray bg-pearl shadow-[var(--shadow-soft)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(145deg, #f4f1eb 0%, #e8eef4 48%, #dde5ee 100%)",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(184,151,90,0.22), transparent 42%), radial-gradient(circle at 85% 70%, rgba(15,39,68,0.08), transparent 40%)",
                    }}
                    aria-hidden
                  />

                  <div className="relative flex min-h-[200px] flex-col items-center justify-center gap-4 px-6 py-10 text-center md:min-h-[240px]">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-navy/10 bg-pearl shadow-[0_12px_40px_rgba(15,39,68,0.08)]">
                      <span className="absolute inset-2 rounded-full border border-dashed border-gold/35" aria-hidden />
                      <Home
                        className="relative h-8 w-8 text-navy/55"
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p className="font-display text-xl text-navy md:text-2xl">
                        No photos yet
                      </p>
                      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-muted">
                        Images will appear here once uploaded. Book a visit to
                        see this space in person.
                      </p>
                    </div>
                    <a
                      href="#enquire-mobile"
                      className="font-ui mt-1 inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.14em] text-pearl transition hover:bg-navy-deep lg:hidden"
                    >
                      Enquire for a visit
                    </a>
                    <a
                      href="#enquire"
                      className="font-ui mt-1 hidden items-center rounded-full bg-navy px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.14em] text-pearl transition hover:bg-navy-deep lg:inline-flex"
                    >
                      Enquire for a visit
                    </a>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Facts strip */}
            <FadeIn delay={0.05}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.slice(0, 4).map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-soft-gray bg-pearl px-4 py-4"
                  >
                    <div className="flex items-center gap-2 text-gold">
                      <Icon className="h-3.5 w-3.5" />
                      <p className="font-ui text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
                        {label}
                      </p>
                    </div>
                    <p className="mt-2 truncate text-sm font-medium text-navy md:text-[0.95rem]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              {facts.length > 4 ? (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {facts.slice(4).map(({ label, value, Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-soft-gray bg-pearl px-4 py-4"
                    >
                      <div className="flex items-center gap-2 text-gold">
                        <Icon className="h-3.5 w-3.5" />
                        <p className="font-ui text-[0.58rem] uppercase tracking-[0.14em] text-text-muted">
                          {label}
                        </p>
                      </div>
                      <p className="mt-2 text-sm font-medium text-navy">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </FadeIn>

            <FadeIn delay={0.08}>
              <section className="rounded-2xl border border-soft-gray bg-pearl p-5 md:p-6">
                <h2 className="font-display text-xl text-navy md:text-2xl">
                  About this space
                </h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
                  {property.description ||
                    `${property.propertyTypeName} available in ${property.areaName}. Contact us for floor details, cabin/workstation layout, and viewing slots.`}
                </p>
              </section>
            </FadeIn>

            {property.amenities.length > 0 ? (
              <FadeIn delay={0.1}>
                <section className="rounded-2xl border border-soft-gray bg-pearl p-5 md:p-6">
                  <h2 className="font-display text-xl text-navy md:text-2xl">
                    Amenities
                  </h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li
                        key={a.id}
                        className="flex items-center gap-2.5 rounded-xl bg-mist/80 px-3.5 py-2.5 text-sm text-navy"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                        {a.name}
                        {a.value != null && a.value !== ""
                          ? ` — ${a.value}`
                          : ""}
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeIn>
            ) : null}

            {property.termsConditions ? (
              <FadeIn delay={0.12}>
                <section className="rounded-2xl border border-soft-gray bg-pearl p-5 md:p-6">
                  <h2 className="font-display text-xl text-navy md:text-2xl">
                    Lease terms
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {property.termsConditions}
                  </p>
                </section>
              </FadeIn>
            ) : null}

            <FadeIn delay={0.14}>
              <section className="rounded-2xl border border-soft-gray bg-pearl p-5 md:p-6">
                <h2 className="font-display text-xl text-navy md:text-2xl">
                  Location
                </h2>
                <p className="mt-3 flex items-start gap-2 text-sm text-text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {location}
                </p>
                <Link
                  href={`/areas/${property.areaId}`}
                  className="font-ui mt-4 inline-block text-xs uppercase tracking-[0.14em] text-gold hover:text-navy"
                >
                  More spaces in {property.areaName} →
                </Link>
              </section>
            </FadeIn>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-ui inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-navy-muted">
                <Share2 className="h-3.5 w-3.5 text-gold" />
                Share
              </span>
              <a
                href={`https://wa.me/?text=${shareText}%20${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-gray bg-pearl px-3.5 py-1.5 text-xs text-navy hover:border-gold"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-soft-gray bg-pearl px-3.5 py-1.5 text-xs text-navy hover:border-gold"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${encoded}`}
                className="rounded-full border border-soft-gray bg-pearl px-3.5 py-1.5 text-xs text-navy hover:border-gold"
              >
                Email
              </a>
            </div>
          </div>

          {/* Sidebar — enquire only (rent already in hero) */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="hidden lg:block" id="enquire">
              <EnquiryForm
                propertyId={property.id}
                pageUrl={pageUrl}
                title="Book a visit"
                subtitle={`Interested in ${property.name}? Leave your details.`}
                className="border-soft-gray shadow-[var(--shadow-lift)]"
              />
              <p className="mt-4 text-center text-xs text-text-muted">
                Or call{" "}
                <a href={SITE.phoneHref} className="text-gold hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 lg:hidden" id="enquire-mobile">
          <EnquiryForm
            propertyId={property.id}
            pageUrl={pageUrl}
            title="Book a visit"
            subtitle={`Interested in ${property.name}? Leave your details.`}
          />
        </div>

        {related.length > 0 ? (
          <section className="mt-14 border-t border-soft-gray pt-12 md:mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                  Nearby options
                </p>
                <h2 className="font-display mt-2 text-2xl text-navy md:text-3xl">
                  More in {property.areaName}
                </h2>
              </div>
              <Link
                href={`/areas/${property.areaId}`}
                className="font-ui text-xs uppercase tracking-[0.14em] text-navy hover:text-gold"
              >
                View all →
              </Link>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Mobile sticky */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-soft-gray bg-pearl/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-[var(--container)] items-center gap-3 px-[4vw]">
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg text-navy">
              {formatRent(property.rent)}
            </p>
            <p className="truncate text-xs text-text-muted">
              {property.name} · {formatSqFeet(property.sqFeet)}
            </p>
          </div>
          <a
            href="#enquire-mobile"
            className="font-ui shrink-0 rounded-full bg-navy px-5 py-3 text-[0.65rem] uppercase tracking-[0.12em] text-pearl"
          >
            Enquire
          </a>
        </div>
      </div>
    </main>
  );
}
