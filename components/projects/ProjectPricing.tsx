"use client";

import { FormEvent, useState } from "react";
import { Download, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ProjectUnit } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectPricingProps {
  projectName: string;
  projectSlug: string;
  units: ProjectUnit[];
  priceListUrl: string;
}

export function ProjectPricing({
  projectName,
  projectSlug,
  units,
  priceListUrl,
}: ProjectPricingProps) {
  const [callbackSent, setCallbackSent] = useState(false);
  const [phone, setPhone] = useState("");

  const onCallback = (e: FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
  };

  return (
    <section
      id="pricing"
      className="section-pad bg-pearl"
      aria-labelledby="pricing-heading"
    >
      <div className="container-luxury">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Pricing"
            title="Unit types & prices"
            description={`Transparent configurations for ${projectName}. Prices are indicative and subject to availability.`}
          />
          <FadeIn delay={0.1}>
            <MagneticButton
              as="a"
              href={priceListUrl}
              className="btn-primary rounded-full"
            >
              <Download className="h-4 w-4" />
              Download Price List
            </MagneticButton>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-soft-gray bg-warm-white shadow-[var(--shadow-soft)]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-soft-gray bg-mist/50">
                  <th className="font-ui px-5 py-4 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                    Unit Type
                  </th>
                  <th className="font-ui px-5 py-4 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                    Carpet Area
                  </th>
                  <th className="font-ui px-5 py-4 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                    Super Area
                  </th>
                  <th className="font-ui px-5 py-4 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                    Price
                  </th>
                  <th className="font-ui px-5 py-4 text-[0.65rem] uppercase tracking-[0.16em] text-navy-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit, i) => (
                  <tr
                    key={unit.id}
                    className={cn(
                      "border-b border-soft-gray/70 transition hover:bg-gold/5",
                      i === units.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="font-display px-5 py-4 text-lg text-navy">
                      {unit.type}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {unit.carpetArea.toLocaleString()} sq.ft
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {unit.superArea.toLocaleString()} sq.ft
                    </td>
                    <td className="font-display px-5 py-4 text-lg text-navy">
                      {unit.price}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "font-ui rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em]",
                          unit.availability === "Available"
                            ? "bg-emerald/10 text-emerald"
                            : "bg-gold/15 text-navy"
                        )}
                      >
                        {unit.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form
            onSubmit={onCallback}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-soft-gray bg-ivory p-5 sm:flex-row sm:items-center md:p-6"
          >
            <p className="font-display flex-1 text-lg text-navy">
              Prefer a call? Request pricing assistance.
            </p>
            {callbackSent ? (
              <p className="text-sm text-emerald" role="status">
                We&apos;ll call you shortly.
              </p>
            ) : (
              <>
                <label className="flex flex-1 items-center gap-2 rounded-full border border-soft-gray bg-pearl px-4 py-3">
                  <Phone className="h-4 w-4 text-gold" />
                  <span className="sr-only">Phone</span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="font-ui w-full bg-transparent text-sm outline-none"
                  />
                </label>
                <button type="submit" className="btn-gold rounded-full px-6">
                  Request Callback
                </button>
              </>
            )}
            <input type="hidden" name="project" value={projectSlug} />
          </form>
        </FadeIn>
        <p className="mt-4 text-xs text-text-muted">
          *Prices are indicative. Taxes, PLC, and other charges extra as
          applicable.
        </p>
      </div>
    </section>
  );
}
