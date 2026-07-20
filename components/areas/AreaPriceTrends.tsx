"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/animations/Reveal";
import type { PriceTrendMetric, PriceTrendPoint } from "@/types";

interface AreaPriceTrendsProps {
  areaName: string;
  trends: PriceTrendPoint[];
  metrics: PriceTrendMetric[];
}

function PriceChart({ trends }: { trends: PriceTrendPoint[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const max = Math.max(...trends.map((t) => t.price));
  const min = Math.min(...trends.map((t) => t.price)) * 0.85;
  const w = 560;
  const h = 240;
  const pad = { t: 20, r: 20, b: 36, l: 48 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const points = trends.map((t, i) => {
    const x = pad.l + (i / (trends.length - 1)) * innerW;
    const y = pad.t + (1 - (t.price - min) / (max - min)) * innerH;
    return { x, y, ...t };
  });

  const lineD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${lineD} L ${points[points.length - 1].x} ${h - pad.b} L ${points[0].x} ${h - pad.b} Z`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelector(".trend-line"),
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ref.current.querySelector(".trend-area"),
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 0.4 }
    );
    gsap.fromTo(
      ref.current.querySelectorAll(".trend-dot"),
      { scale: 0, transformOrigin: "center" },
      { scale: 1, duration: 0.4, stagger: 0.08, delay: 0.9, ease: "back.out(2)" }
    );
  }, [inView]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Property price trend in area from ${trends[0].year} to ${trends[trends.length - 1].year}`}
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8975A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#B8975A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = pad.t + r * innerH;
        return (
          <line
            key={r}
            x1={pad.l}
            x2={w - pad.r}
            y1={y}
            y2={y}
            stroke="rgba(15,39,68,0.08)"
          />
        );
      })}
      <path className="trend-area" d={areaD} fill="url(#trendFill)" />
      <path
        className="trend-line"
        d={lineD}
        fill="none"
        stroke="#B8975A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="800"
      />
      {points.map((p) => (
        <g key={p.year}>
          <circle
            className="trend-dot"
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#FFFEFB"
            stroke="#B8975A"
            strokeWidth="2"
          />
          <text
            x={p.x}
            y={h - 10}
            textAnchor="middle"
            className="fill-navy-muted"
            style={{ fontSize: 11, fontFamily: "var(--font-dm-sans)" }}
          >
            {p.year}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AreaPriceTrends({
  areaName,
  trends,
  metrics,
}: AreaPriceTrendsProps) {
  return (
    <section
      className="section-pad relative overflow-hidden bg-pearl"
      aria-labelledby="price-trends-heading"
    >
      <div
        className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald/10 blur-3xl"
        aria-hidden
      />
      <div className="container-luxury relative z-[2]">
        <SectionHeading
          eyebrow="Price Trends"
          title={`${areaName} market at a glance`}
          description="Historical pricing, rental yields, and growth signals curated by our research desk."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <FadeIn direction="right">
            <div className="rounded-2xl border border-soft-gray bg-warm-white/90 p-4 md:p-6">
              <p className="font-ui mb-4 text-[0.65rem] uppercase tracking-[0.18em] text-navy-muted">
                Avg. price per sq.ft (₹)
              </p>
              <PriceChart trends={trends} />
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {metrics.map((m, i) => (
              <FadeIn key={m.id} delay={0.1 + i * 0.08} direction="up">
                <article className="rounded-2xl border border-soft-gray bg-ivory p-5 transition duration-400 hover:border-gold/40 hover:shadow-[var(--shadow-soft)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-ui text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                      {m.label}
                    </p>
                    <span className="font-ui text-xs text-emerald">{m.change}</span>
                  </div>
                  <p className="font-display mt-2 text-3xl text-navy">{m.value}</p>
                  <p className="mt-2 text-sm text-text-muted">{m.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
