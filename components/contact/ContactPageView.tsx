"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { SITE } from "@/constants/site";

interface ContactPageViewProps {
  propertyId?: string;
}

const CHANNELS = [
  {
    label: "Call",
    value: SITE.phone,
    href: SITE.phoneHref,
    hint: "Speak with our leasing desk",
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: SITE.whatsapp,
    hint: "Share area, size & budget",
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    hint: "For detailed requirements",
    Icon: Mail,
  },
] as const;

export function ContactPageView({ propertyId }: ContactPageViewProps) {
  const address = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

  return (
    <main id="main-content" className="bg-ivory">
      <section className="on-dark relative overflow-hidden bg-navy-deep pt-24 md:pt-28">
        <Image
          src={HOME_VISUALS.cta}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/92 to-navy/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(184,151,90,0.28),transparent_42%)]" />

        <div className="container-luxury relative z-10 pb-14 pt-8 md:pb-16 md:pt-10">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Contact · {SITE.name}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.1] text-pearl md:text-5xl lg:text-6xl">
            Let’s find your
            <span className="italic text-champagne"> next space.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pearl/75 md:text-lg">
            Tell us area, size, and budget — we’ll match options from live
            inventory across Delhi NCR.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/35 px-6 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="enquiry" className="py-14 md:py-16">
        <div className="container-luxury grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <FadeIn>
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
                Reach us
              </p>
              <h2 className="font-display mt-2 text-3xl text-navy md:text-4xl">
                Prefer a direct line?
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
                Call, message, or email — or use the form and our team will
                follow up from the CRM.
              </p>

              <div className="mt-7 space-y-3">
                {CHANNELS.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={
                      channel.label === "WhatsApp" ? "_blank" : undefined
                    }
                    rel={
                      channel.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-4 rounded-2xl border border-soft-gray bg-pearl px-4 py-4 transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[var(--shadow-soft)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-gold transition group-hover:bg-gold group-hover:text-navy-deep">
                      <channel.Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="font-ui block text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-navy md:text-base">
                        {channel.value}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-muted">
                        {channel.hint}
                      </span>
                    </span>
                  </a>
                ))}

                <div className="flex items-start gap-4 rounded-2xl border border-soft-gray bg-pearl px-4 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                      Office
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-navy md:text-base">
                      {address}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      Visits by appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/25 bg-champagne/20 px-4 py-3.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <p className="text-sm leading-relaxed text-navy/80">
                  Typical response within a few business hours on weekdays.
                  Share preferred areas and budget for faster shortlists.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/properties"
                  className="font-ui inline-flex items-center gap-2 rounded-full border border-soft-gray bg-pearl px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  Browse properties
                </Link>
                <Link
                  href="/areas"
                  className="font-ui inline-flex items-center gap-2 rounded-full border border-soft-gray bg-pearl px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-navy transition hover:border-gold hover:text-gold"
                >
                  Explore areas
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EnquiryForm
              propertyId={propertyId}
              pageUrl={`${SITE.url}/contact`}
              title={
                propertyId ? "Enquire about this space" : "Send an enquiry"
              }
              subtitle={
                propertyId
                  ? "This enquiry is linked to the property you were viewing."
                  : "Required: name and mobile. Optional: email and requirement."
              }
              className="shadow-[var(--shadow-lift)]"
            />
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
