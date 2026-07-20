"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  as = "button",
  href,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = { x: springX, y: springY };
  const shared = {
    ref: ref as never,
    className: cn("inline-flex will-change-transform", className),
    style,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    "aria-label": ariaLabel,
  };

  if (as === "a" && href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  if (as === "div") {
    return <motion.div {...shared}>{children}</motion.div>;
  }

  return (
    <motion.button type={type} {...shared}>
      {children}
    </motion.button>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`
    radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(184,151,90,0.18), transparent 70%)
  `;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}
