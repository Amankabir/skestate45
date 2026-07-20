"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { INVESTMENT_METRICS } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import { TrendingUp } from "lucide-react";

function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const paths = ref.current.querySelectorAll(".chart-line");
    const bars = ref.current.querySelectorAll(".chart-bar");
    gsap.fromTo(
      paths,
      { strokeDashoffset: 400 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power3.out" }
    );
    gsap.fromTo(
      bars,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1.1, stagger: 0.08, ease: "power2.out", delay: 0.3 }
    );
  }, [inView]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 480 260"
      className="h-auto w-full"
      role="img"
      aria-label="Investment growth chart showing rising property values"
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8975A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#B8975A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 90, 140, 190, 240].map((y) => (
        <line
          key={y}
          x1="40"
          x2="460"
          y1={y}
          y2={y}
          stroke="rgba(15,39,68,0.08)"
          strokeWidth="1"
        />
      ))}
      {[
        [60, 180, 40],
        [120, 150, 70],
        [180, 130, 90],
        [240, 110, 110],
        [300, 95, 125],
        [360, 70, 150],
        [420, 50, 170],
      ].map(([x, y, h], i) => (
        <rect
          key={i}
          className="chart-bar"
          x={x}
          y={y}
          width="28"
          height={h}
          rx="4"
          fill={i === 6 ? "#B8975A" : "rgba(15,39,68,0.12)"}
        />
      ))}
      <path
        className="chart-line"
        d="M54 200 C 100 190, 140 160, 180 145 S 260 120, 300 100 S 380 70, 434 55"
        fill="none"
        stroke="#B8975A"
        strokeWidth="2.5"
        strokeDasharray="400"
        strokeLinecap="round"
      />
      <path
        d="M54 200 C 100 190, 140 160, 180 145 S 260 120, 300 100 S 380 70, 434 55 L 434 240 L 54 240 Z"
        fill="url(#areaGrad)"
        opacity="0.7"
      />
    </svg>
  );
}

export function Investment() {
  return (
    <section
      id="investment"
      className="section-pad relative overflow-hidden bg-pearl"
      aria-labelledby="investment-heading"
    >
      <div
        className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Investment Intelligence"
              title="Beauty that compounds"
              description="Our research desk tracks rental yields, corridor growth, and future appreciation — so every acquisition is as considered as it is beautiful."
            />
            <FadeIn delay={0.2}>
              <div className="mt-10 rounded-2xl border border-soft-gray bg-warm-white/80 p-4 md:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald" />
                  <span className="font-ui text-xs uppercase tracking-[0.18em] text-navy-muted">
                    Portfolio Growth Index
                  </span>
                </div>
                <GrowthChart />
              </div>
            </FadeIn>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {INVESTMENT_METRICS.map((metric, i) => (
              <FadeIn key={metric.id} delay={0.1 + i * 0.1} direction="up">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-soft-gray bg-ivory p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-soft)]">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 transition-transform duration-500 group-hover:scale-150" />
                  <p className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                    {metric.label}
                  </p>
                  <p className="font-display mt-3 text-4xl text-navy">{metric.value}</p>
                  <p className="font-ui mt-1 text-xs text-emerald">{metric.change}</p>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">
                    {metric.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
