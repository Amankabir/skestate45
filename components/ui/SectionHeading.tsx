"use client";

import { FadeIn, TextReveal } from "@/animations/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeIn delay={0.05}>
          <p
            className={cn(
              "font-ui mb-4 text-xs font-medium uppercase tracking-[0.28em]",
              light ? "text-champagne" : "text-gold"
            )}
          >
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <TextReveal
        text={title}
        as="h2"
        className={cn(
          "text-4xl leading-[1.15] md:text-5xl lg:text-[3.25rem]",
          light ? "text-pearl" : "text-navy"
        )}
      />
      {description && (
        <FadeIn delay={0.2}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed md:text-lg",
              light ? "text-pearl/75" : "text-text-muted",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
