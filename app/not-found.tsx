import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  MapPin,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { HOME_VISUALS } from "@/constants/homeVisuals";
import { SITE } from "@/constants/site";

const LINKS = [
  {
    href: "/",
    label: "Home",
    hint: "Back to the homepage",
    Icon: Home,
  },
  {
    href: "/properties",
    label: "Properties",
    hint: "Browse live inventory",
    Icon: Building2,
  },
  {
    href: "/areas",
    label: "Areas",
    hint: "Explore micro-markets",
    Icon: MapPin,
  },
  {
    href: "/amenities",
    label: "Amenities",
    hint: "Filter by features",
    Icon: Sparkles,
  },
] as const;

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep"
    >
      <Image
        src={HOME_VISUALS.cta}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.22]"
        quality={75}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/92 to-navy/85"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(184,151,90,0.22),transparent_45%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <div className="container-luxury relative z-10 w-full py-28 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
            Error · {SITE.name}
          </p>

          <p
            className="font-display mt-4 text-[6.5rem] leading-none text-champagne/25 md:text-[9rem]"
            aria-hidden
          >
            404
          </p>

          <h1 className="font-display -mt-6 text-4xl text-pearl md:-mt-8 md:text-5xl lg:text-6xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-pearl/70 md:text-lg">
            This link doesn&apos;t exist — or the listing may have been removed.
            Head back to live inventory or talk to our team.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-gold font-ui inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.14em]"
            >
              Go home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/35 px-6 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-gold hover:text-gold"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Contact
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-pearl/15 bg-pearl/[0.04] px-4 py-4 text-left transition hover:border-gold/45 hover:bg-pearl/[0.08]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pearl/20 text-champagne transition group-hover:border-gold group-hover:text-gold">
                <item.Icon className="h-4 w-4" />
              </span>
              <span className="font-display mt-3 block text-lg text-pearl">
                {item.label}
              </span>
              <span className="mt-1 block text-xs text-pearl/55">
                {item.hint}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
