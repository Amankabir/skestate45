"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SITE } from "@/constants/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0zM4.13 20.5V9.25h3.62V20.5H4.13zM10.13 9.25h3.47v1.54h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54V20.5h-3.62v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5h-3.78V9.25z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export function Footer() {
  const social = [
    { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: SITE.social.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: SITE.social.twitter, label: "X", Icon: XIcon },
  ];

  const address = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

  return (
    <footer
      className="on-dark relative overflow-hidden bg-navy-deep text-pearl"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(184,151,90,0.14),transparent_42%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_100%,rgba(26,58,92,0.55),transparent_45%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <div className="container-luxury relative z-[2] pt-12 md:pt-14">
        {/* CTA strip — fills visual weight at top */}
        <div className="flex flex-col gap-5 rounded-2xl border border-pearl/12 bg-pearl/[0.04] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
          <div>
            <p className="font-ui text-[0.65rem] uppercase tracking-[0.22em] text-champagne">
              Ready to lease?
            </p>
            <p className="font-display mt-1.5 text-xl text-pearl md:text-2xl">
              Tell us your area, size & budget
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact#enquiry"
              className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.14em]"
            >
              Send enquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/25 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Main grid — denser 3-column layout */}
        <div className="mt-10 grid gap-10 border-b border-pearl/10 pb-10 md:mt-12 md:grid-cols-[1.15fr_0.9fr_0.9fr] md:gap-8 lg:gap-12">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl tracking-tight md:text-3xl">
                SK<span className="text-gold"> Estate</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-pearl/60">
              {SITE.tagline}. Furnished offices, retail, and commercial spaces
              with transparent pricing.
            </p>

            <div className="mt-6 space-y-2.5">
              <p className="flex items-start gap-3 text-sm text-pearl/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{address}</span>
              </p>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 text-sm text-pearl/70 transition hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-sm text-pearl/70 transition hover:text-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {SITE.email}
              </a>
            </div>

            <div className="mt-6 flex gap-2.5">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-pearl/15 text-pearl/65 transition hover:border-gold hover:text-gold"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-pearl/70 transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-pearl/70 transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-pearl/12 bg-pearl/[0.03] px-4 py-3.5">
              <p className="font-ui text-[0.6rem] uppercase tracking-[0.18em] text-pearl/45">
                Leasing desk
              </p>
              <a
                href={SITE.phoneHref}
                className="mt-1 block text-sm font-medium text-pearl transition hover:text-gold"
              >
                {SITE.phone}
              </a>
              <p className="mt-1 text-xs text-pearl/45">
                Weekdays · respond within a few hours
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-pearl/40 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/properties" className="transition hover:text-gold">
              Properties
            </Link>
            <Link href="/areas" className="transition hover:text-gold">
              Areas
            </Link>
            <Link href="/contact" className="transition hover:text-gold">
              Contact & enquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
