"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";

interface StoryBlock {
  id: string;
  title: string;
  content: string;
}

interface AboutStoryProps {
  image: string;
  story: readonly StoryBlock[];
}

export function AboutStory({ image, story }: AboutStoryProps) {
  return (
    <section
      className="section-pad bg-ivory"
      aria-labelledby="story-heading"
    >
      <div className="container-luxury">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ClipReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={image}
                alt="Interior of a curated SK Estate residence"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ClipReveal>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on fewer, better homes"
            />
            <div className="mt-10 space-y-8">
              {story.map((block, i) => (
                <FadeIn key={block.id} delay={i * 0.1} direction="left">
                  <article className="border-l-2 border-soft-gray pl-5 transition-colors hover:border-gold">
                    <h3 className="font-display text-xl text-navy md:text-2xl">
                      {block.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                      {block.content}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
