import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, LayoutGrid, ArrowRight } from "lucide-react";
import { FadeIn } from "@/animations/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HOME_VISUALS } from "@/constants/homeVisuals";

interface TrustBarProps {
  propertyCount: number;
  areaCount: number;
  typeCount: number;
}

export function TrustBar({
  propertyCount,
  areaCount,
  typeCount,
}: TrustBarProps) {
  const stats = [
    {
      value: propertyCount,
      label: "Spaces",
      hint: "Available to lease",
      href: "/properties",
      Icon: Building2,
    },
    {
      value: areaCount,
      label: "Areas",
      hint: "Delhi NCR markets",
      href: "/areas",
      Icon: MapPin,
    },
    {
      value: typeCount,
      label: "Types",
      hint: "Office to retail",
      href: "/properties",
      Icon: LayoutGrid,
    },
  ] as const;

  return (
    <section
      id="trust"
      className="relative overflow-hidden border-y border-soft-gray/70 bg-warm-white"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,90,0.08),transparent_50%)]"
        aria-hidden
      />

      <div className="container-luxury relative z-[2] py-12 md:py-16 lg:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-12">
          {/* Image panel */}
          <FadeIn className="relative min-h-[240px] overflow-hidden rounded-3xl lg:min-h-[420px]">
            <Image
              src={HOME_VISUALS.areas[1]!}
              alt="Modern commercial interior"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.2em] text-champagne">
                Live catalogue
              </p>
              <p className="font-display mt-2 text-2xl text-pearl md:text-3xl">
                Spaces ready for business
              </p>
            </div>
          </FadeIn>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-gold">
                Why browse with us
              </p>
              <h2
                id="trust-heading"
                className="font-display mt-3 max-w-xl text-3xl leading-tight text-navy md:text-[2.5rem]"
              >
                Real inventory.
                <br className="hidden sm:block" />
                <span className="text-navy-muted"> Real availability.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
                Every number below comes from our live listings — search by area,
                type, or budget and enquire in minutes.
              </p>
            </FadeIn>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((item, i) => (
                <FadeIn key={item.label} delay={0.08 * (i + 1)}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-soft-gray bg-pearl p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[var(--shadow-lift)]"
                  >
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-gold transition group-hover:bg-navy group-hover:text-pearl">
                      <item.Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="font-display text-3xl text-navy md:text-[2rem]">
                      <AnimatedCounter end={item.value} />
                      <span className="text-gold">+</span>
                    </p>
                    <p className="font-ui mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-navy">
                      {item.label}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                      {item.hint}
                      <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
