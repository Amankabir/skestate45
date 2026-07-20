"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2.4,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {inView ? (
        <CountUp end={end} duration={duration} decimals={decimals} separator="," />
      ) : (
        0
      )}
      {suffix}
    </span>
  );
}
