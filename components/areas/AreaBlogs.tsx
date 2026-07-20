"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";
import type { BlogPost } from "@/types";

interface AreaBlogsProps {
  areaName: string;
  blogs: BlogPost[];
}

export function AreaBlogs({ areaName, blogs }: AreaBlogsProps) {
  return (
    <section className="section-pad bg-ivory" aria-labelledby="area-blogs-heading">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Related Articles"
          title={`${areaName} insights`}
          description="Guides and market notes to help you buy with clarity."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {blogs.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <article className="group">
                <Link href={post.href} className="block">
                  <ClipReveal className="relative mb-5 aspect-[16/11] overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="font-ui absolute left-4 top-4 rounded-full bg-pearl/95 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-navy">
                      {post.category}
                    </span>
                  </ClipReveal>
                  <div className="font-ui flex gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
                    <time>{post.date}</time>
                    <span aria-hidden>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="font-display mt-3 text-xl text-navy transition-colors group-hover:text-gold md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <span className="font-ui mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gold">
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
