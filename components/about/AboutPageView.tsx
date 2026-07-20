"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Search,
  MessageSquare,
  CheckCircle2,
  Compass,
  KeyRound,
  LineChart,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { SITE } from "@/constants/site";

interface AboutPageViewProps {
  propertyCount: number;
  areaCount: number;
  typeCount: number;
  amenityCount: number;
}

const PILLARS = [
  {
    title: "Live inventory",
    body: "Listings sync from our CRM — rent, size, amenities, and availability stay current.",
    Icon: KeyRound,
  },
  {
    title: "Delhi NCR focus",
    body: "From Connaught Place to South Delhi — micro-markets operators actually search.",
    Icon: Compass,
  },
  {
    title: "Clear commercials",
    body: "Published rent and square footage where available, before you step into a visit.",
    Icon: LineChart,
  },
];

const STEPS = [
  {
    title: "Search",
    body: "Filter by area, type, budget, size, and amenities.",
    Icon: Search,
  },
  {
    title: "Shortlist",
    body: "Compare live spaces and open the ones that fit.",
    Icon: Building2,
  },
  {
    title: "Enquire",
    body: "Send your requirement — our team follows up from the CRM.",
    Icon: MessageSquare,
  },
];

export function AboutPageView({
  propertyCount,
  areaCount,
  typeCount,
  amenityCount,
}: AboutPageViewProps) {
  const stats = [
    { label: "Listed spaces", value: propertyCount, Icon: Building2 },
    { label: "Areas covered", value: areaCount, Icon: MapPin },
    { label: "Property types", value: typeCount, Icon: LayoutGrid },
    { label: "Amenities", value: amenityCount, Icon: Sparkles },
  ];

  return (
    <main id="main-content" className="bg-ivory">
      {/* Compact hero — content near top, not empty void */}
      <section className="on-dark relative overflow-hidden bg-navy-deep pt-24 md:pt-28">
        <Image
          src={HOME_VISUALS.why}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/92 to-navy/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(184,151,90,0.25),transparent_45%)]" />

        <div className="container-luxury relative z-10 pb-16 pt-8 md:pb-20 md:pt-10">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            About · {SITE.name}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.1] text-pearl md:text-5xl lg:text-6xl">
            Commercial spaces,
            <span className="italic text-champagne"> matched with care.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pearl/75 md:text-lg">
            {SITE.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
            >
              Browse properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="font-ui inline-flex items-center rounded-full border border-pearl/35 px-6 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-gold hover:text-gold"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats overlapping hero — fills the gap */}
      <section className="relative z-10 -mt-8 md:-mt-10">
        <div className="container-luxury">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-soft-gray bg-pearl p-3 shadow-[var(--shadow-lift)] md:grid-cols-4 md:gap-4 md:p-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-warm-white px-4 py-4 md:px-5 md:py-5"
              >
                <stat.Icon className="h-4 w-4 text-gold" />
                <p className="font-display mt-3 text-2xl text-navy md:text-3xl">
                  <AnimatedCounter end={stat.value} />
                  <span className="text-gold">+</span>
                </p>
                <p className="font-ui mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story — tighter */}
      <section className="py-14 md:py-16">
        <div className="container-luxury grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] lg:aspect-[5/4]">
              <Image
                src={HOME_VISUALS.hero}
                alt="Modern commercial workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 to-transparent" />
              <p className="font-ui absolute bottom-5 left-5 text-[0.65rem] uppercase tracking-[0.18em] text-champagne">
                {SITE.tagline}
              </p>
            </div>
          </FadeIn>

          <div>
            <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
              Our approach
            </p>
            <h2 className="font-display mt-2 text-3xl text-navy md:text-4xl">
              Built for operators who need clarity
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
              {SITE.name} connects businesses with furnished offices, retail,
              shops, and commercial spaces across Delhi NCR. Inventory stays
              live, filters stay practical, and enquiries reach a real team.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Live listings from our CRM",
                "Search by area, type, rent & amenities",
                "Transparent size and pricing where available",
                "Direct enquiry with page context",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm md:text-[0.95rem]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-warm-white py-14 md:py-16">
        <div className="container-luxury">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
                Why us
              </p>
              <h2 className="font-display mt-2 text-3xl text-navy md:text-4xl">
                Three things we get right
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PILLARS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-gold/35"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-gold">
                  <item.Icon className="h-4 w-4" />
                </span>
                <h3 className="font-display mt-4 text-xl text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-16">
        <div className="container-luxury">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
            Process
          </p>
          <h2 className="font-display mt-2 text-3xl text-navy md:text-4xl">
            How leasing starts
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-soft-gray bg-pearl p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-gold/35">
                    0{i + 1}
                  </span>
                  <step.Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display mt-3 text-xl text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + form — denser */}
      <section className="border-t border-soft-gray bg-pearl py-14 md:py-16">
        <div className="container-luxury grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
              Get in touch
            </p>
            <h2 className="font-display mt-2 text-3xl text-navy md:text-4xl">
              Tell us what you need
            </h2>
            <p className="mt-3 text-sm text-text-muted md:text-base">
              Share area, size, and budget — we&apos;ll respond with matching
              options from live inventory.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-soft-gray bg-warm-white px-4 py-3 text-sm text-navy transition hover:border-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 rounded-xl border border-soft-gray bg-warm-white px-4 py-3 text-sm text-navy transition hover:border-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                {SITE.email}
              </a>
              <p className="flex items-start gap-3 rounded-xl border border-soft-gray bg-warm-white px-4 py-3 text-sm text-navy">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {SITE.address.street}, {SITE.address.city},{" "}
                  {SITE.address.region} {SITE.address.postalCode}
                </span>
              </p>
            </div>
          </div>

          <EnquiryForm
            pageUrl={`${SITE.url}/about`}
            title="Talk to our team"
            subtitle="Required: name and mobile."
            className="shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>
    </main>
  );
}
