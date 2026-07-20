"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Download,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { CharReveal } from "@/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/constants/site";
import type { ProjectDetail } from "@/types";

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="on-dark relative flex min-h-[100svh] items-end overflow-hidden bg-navy-deep"
      aria-labelledby="project-hero-heading"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <Image
          src={project.heroImage}
          alt={`${project.name} luxury residences by ${project.builder}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/45 via-navy-deep/35 to-navy-deep/88"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(184,151,90,0.22),transparent_45%)]"
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pb-16 pt-28 md:pb-20 md:pt-36"
      >
        <div className="container-luxury">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="font-ui flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-pearl/60">
              <li>
                <Link href="/" className="transition hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link href="/projects" className="transition hover:text-gold">
                  Projects
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-champagne" aria-current="page">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-pearl/95 shadow-lg"
            >
              <span className="font-display text-sm text-navy">
                {project.builderLogoText}
              </span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-ui rounded-full border border-pearl/25 bg-pearl/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-pearl backdrop-blur-md"
            >
              {project.status}
            </motion.span>
          </div>

          <h1
            id="project-hero-heading"
            className="font-display mt-6 max-w-4xl text-4xl leading-[1.05] text-pearl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <CharReveal text={project.name} delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="font-accent mt-4 max-w-2xl text-xl text-champagne md:text-2xl"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-x-10 gap-y-4"
          >
            <div className="flex items-center gap-2 text-pearl/80">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="text-sm">{project.location}</span>
            </div>
            <div>
              <p className="font-display text-3xl text-pearl md:text-4xl">
                {project.startingPrice}
              </p>
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-pearl/50">
                Starting Price
              </p>
            </div>
            <div>
              <p className="font-display text-xl text-pearl md:text-2xl">
                {project.possession}
              </p>
              <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-pearl/50">
                Possession
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-1 h-4 w-4 text-gold" />
              <div>
                <p className="font-ui text-sm text-pearl">{project.reraNumber}</p>
                <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-pearl/50">
                  RERA
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton
              as="a"
              href={`/contact?project=${project.slug}&intent=visit`}
              className="btn-gold rounded-full"
            >
              <Calendar className="h-4 w-4" />
              Book Site Visit
            </MagneticButton>
            <MagneticButton
              as="a"
              href={project.brochureUrl}
              className="btn-ghost rounded-full"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SITE.whatsapp}
              className="btn-ghost rounded-full"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
