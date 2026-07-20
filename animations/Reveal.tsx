"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const charVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.028,
    },
  }),
};

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn("overflow-hidden text-inherit", className)}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline text-inherit">
        {words.map((word, wi) => (
          <span
            key={`${word}-${wi}`}
            className="mr-[0.28em] inline-block overflow-hidden align-bottom last:mr-0"
          >
            <motion.span
              className="inline-block text-inherit"
              custom={wi + delay * 10}
              variants={charVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CharReveal({ text, className, delay = 0 }: CharRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const chars = text.split("");

  return (
    <span
      ref={ref}
      className={cn("inline-block text-inherit", className)}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="text-inherit">
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block text-inherit"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(6px)" }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...offsets[direction],
        filter: "blur(8px)",
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, ...offsets[direction], filter: "blur(8px)" }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={
        inView
          ? { clipPath: "inset(0% 0 0 0)" }
          : { clipPath: "inset(100% 0 0 0)" }
      }
      transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleReveal({ children, className, delay = 0 }: ScaleRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
