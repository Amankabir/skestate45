"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { FadeIn, CharReveal } from "@/animations/Reveal";

const POSTER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=85";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="on-dark relative min-h-[70vh] overflow-hidden md:min-h-[85vh]"
      aria-labelledby="video-heading"
    >
      <Image
        src={POSTER}
        alt="Cinematic view of a luxury estate at golden hour"
        fill
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      <div className="absolute inset-0 bg-navy-deep/45" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,26,47,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 text-center md:min-h-[85vh]">
        <FadeIn>
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-champagne">
            Film
          </p>
        </FadeIn>
        <h2
          id="video-heading"
          className="font-display mt-4 max-w-3xl text-4xl text-pearl md:text-6xl"
          style={{ textShadow: "0 2px 24px rgba(10,26,47,0.45)" }}
        >
          <CharReveal text="Step inside the" className="text-pearl" />
          <br />
          <span className="font-accent italic text-champagne">
            <CharReveal text="SK Estate world" delay={0.3} className="text-champagne" />
          </span>
        </h2>
        <FadeIn delay={0.35}>
          <p className="mt-5 max-w-md text-pearl/70">
            A short film on light, material, and the quiet confidence of a home
            chosen with intention.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative mt-10 flex h-20 w-20 items-center justify-center rounded-full border border-pearl/40 bg-pearl/10 backdrop-blur-md transition hover:border-gold hover:bg-gold"
            aria-label="Play brand film"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-pearl/30"
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Play className="relative ml-1 h-7 w-7 fill-pearl text-pearl transition group-hover:fill-navy-deep group-hover:text-navy-deep" />
          </button>
        </FadeIn>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Brand film player"
          >
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl transition hover:bg-pearl/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-navy shadow-2xl">
              <iframe
                title="SK Estate brand film"
                src="https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&rel=0"
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
