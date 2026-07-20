"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Phone,
  MessageCircle,
  Download,
  User,
  Mail,
} from "lucide-react";
import { SITE } from "@/constants/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn, CharReveal } from "@/animations/Reveal";

interface AreaLeadCTAProps {
  areaName: string;
  areaSlug: string;
  image: string;
}

export function AreaLeadCTA({ areaName, areaSlug, image }: AreaLeadCTAProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      className="on-dark relative overflow-hidden py-20 md:py-28"
      aria-labelledby="area-lead-heading"
    >
      <Image
        src={image}
        alt={`${areaName} — start your property search with SK Estate`}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/50" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/25"
        aria-hidden
      />

      <div className="container-luxury relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <p className="font-ui text-xs uppercase tracking-[0.28em] text-champagne">
                Start Your Search
              </p>
            </FadeIn>
            <h2
              id="area-lead-heading"
              className="font-display mt-4 text-4xl text-pearl md:text-5xl"
              style={{ textShadow: "0 2px 24px rgba(10,26,47,0.45)" }}
            >
              <CharReveal
                text={`Ready for ${areaName}?`}
                className="text-pearl"
              />
            </h2>
            <FadeIn delay={0.25}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pearl/70">
                Book a private site visit, request a callback, or download our{" "}
                {areaName} brochure — our advisors respond within the hour.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  as="a"
                  href={`/contact?area=${areaSlug}&intent=visit`}
                  className="btn-gold rounded-full"
                >
                  <Calendar className="h-4 w-4" />
                  Book Site Visit
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={SITE.phoneHref}
                  className="btn-ghost rounded-full"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={SITE.whatsapp}
                  className="btn-ghost rounded-full"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </MagneticButton>
                <a
                  href={`/brochure?area=${areaSlug}`}
                  className="font-ui inline-flex items-center gap-2 rounded-full border border-pearl/30 px-5 py-3 text-xs uppercase tracking-[0.14em] text-pearl transition hover:border-champagne"
                >
                  <Download className="h-4 w-4" />
                  Brochure
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left">
            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl border-pearl/15 bg-pearl/10 p-6 md:p-8"
            >
              <p className="font-display text-2xl text-pearl">
                Request a callback
              </p>
              <p className="mt-1 text-sm text-pearl/60">
                Share your details — we&apos;ll call you shortly.
              </p>

              {sent ? (
                <p
                  className="mt-8 rounded-2xl bg-emerald/20 px-4 py-6 text-center text-pearl"
                  role="status"
                >
                  Thank you. An SK Estate advisor will reach out shortly about{" "}
                  {areaName}.
                </p>
              ) : (
                <div className="mt-6 space-y-3">
                  <label className="flex items-center gap-3 rounded-full border border-pearl/20 bg-pearl/5 px-4 py-3">
                    <User className="h-4 w-4 text-gold" aria-hidden />
                    <span className="sr-only">Full name</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="font-ui w-full bg-transparent text-sm text-pearl outline-none placeholder:text-pearl/40"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-full border border-pearl/20 bg-pearl/5 px-4 py-3">
                    <Phone className="h-4 w-4 text-gold" aria-hidden />
                    <span className="sr-only">Phone</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="font-ui w-full bg-transparent text-sm text-pearl outline-none placeholder:text-pearl/40"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-full border border-pearl/20 bg-pearl/5 px-4 py-3">
                    <Mail className="h-4 w-4 text-gold" aria-hidden />
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional)"
                      className="font-ui w-full bg-transparent text-sm text-pearl outline-none placeholder:text-pearl/40"
                    />
                  </label>
                  <button
                    type="submit"
                    className="btn-gold mt-2 w-full rounded-full"
                  >
                    Request Callback
                  </button>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
