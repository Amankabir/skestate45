"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SITE } from "@/constants/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
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
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  const social = [
    { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: SITE.social.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: SITE.social.twitter, label: "X", Icon: XIcon },
  ];

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-deep text-pearl" role="contentinfo">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,151,90,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="container-luxury relative z-[2] pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-pearl/10 pb-14 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl tracking-tight">
                SK<span className="text-gold"> Estate</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl/60">
              {SITE.tagline}. A luxury real estate atelier for those who seek
              residences of lasting character.
            </p>

            <div className="mt-8 space-y-3 text-sm text-pearl/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {SITE.address.street}, {SITE.address.city},{" "}
                  {SITE.address.region} {SITE.address.postalCode}
                </span>
              </p>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 transition hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 transition hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                {SITE.email}
              </a>
            </div>

            <div className="mt-8 flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/15 text-pearl/70 transition hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Company", FOOTER_LINKS.company],
                ["Properties", FOOTER_LINKS.properties],
                ["Areas", FOOTER_LINKS.areas],
                ["Quick Links", FOOTER_LINKS.quick],
              ] as const
            ).map(([title, links]) => (
              <div key={title}>
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
                  {title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-pearl/65 transition hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 border-b border-pearl/10 py-12 lg:grid-cols-2">
          <div>
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
              Newsletter
            </p>
            <h3 className="font-display mt-3 text-2xl text-pearl">
              Private market briefings
            </h3>
            <p className="mt-2 max-w-md text-sm text-pearl/55">
              Monthly insights on launches, off-market opportunities, and
              corridor intelligence — delivered with discretion.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex max-w-md gap-2">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="font-ui flex-1 rounded-full border border-pearl/20 bg-pearl/5 px-5 py-3 text-sm text-pearl outline-none placeholder:text-pearl/40 focus:border-gold"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy-deep transition hover:bg-gold-light"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {sent && (
              <p className="mt-3 text-sm text-emerald-soft" role="status">
                Thank you — you&apos;re on the list.
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-pearl/10">
            <iframe
              title="SK Estate office location map"
              src="https://maps.google.com/maps?q=Golf%20Course%20Road%20Gurugram&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-56 w-full grayscale contrast-125 opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center text-xs text-pearl/40 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-gold">
              Terms
            </Link>
            <Link href="/cookies" className="transition hover:text-gold">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
