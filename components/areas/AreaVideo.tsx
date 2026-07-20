"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { FadeIn, CharReveal } from "@/animations/Reveal";

interface AreaVideoProps {
  areaName: string;
  poster: string;
  videoUrl: string;
}

export function AreaVideo({ areaName, poster, videoUrl }: AreaVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="on-dark relative min-h-[65vh] overflow-hidden md:min-h-[75vh]"
      aria-labelledby="area-video-heading"
    >
      <Image
        src={poster}
        alt={`Video tour of ${areaName}`}
        fill
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      <div className="absolute inset-0 bg-navy-deep/45" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(10,26,47,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center px-6 text-center md:min-h-[75vh]">
        <FadeIn>
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-champagne">
            Video Tour
          </p>
        </FadeIn>
        <h2
          id="area-video-heading"
          className="font-display mt-4 max-w-2xl text-4xl text-pearl md:text-5xl"
          style={{ textShadow: "0 2px 24px rgba(10,26,47,0.45)" }}
        >
          <CharReveal text={`Experience ${areaName}`} className="text-pearl" />
        </h2>
        <FadeIn delay={0.3}>
          <p className="mt-4 max-w-md text-pearl/70">
            A cinematic walk through avenues, residences, and the rhythm of
            planned living.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative mt-10 flex h-20 w-20 items-center justify-center rounded-full border border-pearl/40 bg-pearl/10 backdrop-blur-md transition hover:border-gold hover:bg-gold"
            aria-label={`Play ${areaName} video tour`}
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-pearl/30"
              animate={{ scale: [1, 1.4], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
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
            aria-label="Video player"
          >
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/10 text-pearl"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-navy shadow-2xl">
              <iframe
                title={`${areaName} video tour`}
                src={videoUrl}
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
