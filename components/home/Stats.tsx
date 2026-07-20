import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/animations/Reveal";

interface StatsProps {
  propertyCount: number;
  areaCount: number;
  typeCount: number;
  amenityCount: number;
}

export function Stats({
  propertyCount,
  areaCount,
  typeCount,
  amenityCount,
}: StatsProps) {
  const items = [
    { label: "Listed spaces", value: propertyCount },
    { label: "Micro-markets", value: areaCount },
    { label: "Property types", value: typeCount },
    { label: "Amenities", value: amenityCount },
  ];

  return (
    <section
      className="relative overflow-hidden bg-navy py-16 text-pearl md:py-20"
      aria-labelledby="stats-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,151,90,0.16),transparent_50%)]"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Live inventory"
          title="By the numbers"
          description="Figures refresh directly from our public catalogue."
          light
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-pearl/10 bg-pearl/[0.05] px-6 py-8 text-center backdrop-blur-sm">
                <p className="font-display text-4xl md:text-5xl">
                  <AnimatedCounter end={item.value} />
                </p>
                <p className="font-ui mt-3 text-xs uppercase tracking-[0.16em] text-pearl/60">
                  {item.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
