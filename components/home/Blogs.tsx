"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOGS } from "@/constants/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, ClipReveal } from "@/animations/Reveal";

export function Blogs() {
  return (
    <section className="section-pad bg-warm-white" aria-labelledby="blogs-heading">
      <div className="container-luxury">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The Journal"
            title="Perspectives on living well"
            description="Design, markets, and the quiet details that separate a house from a home."
          />
          <FadeIn delay={0.15}>
            <Link
              href="/blog"
              className="font-ui inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-navy transition hover:text-gold"
            >
              All Articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {BLOGS.map((post, i) => (
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
                    <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-500 group-hover:bg-navy-deep/20" />
                    <span className="font-ui absolute left-4 top-4 rounded-full bg-pearl/95 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-navy">
                      {post.category}
                    </span>
                  </ClipReveal>
                  <div className="font-ui flex gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
                    <time dateTime={post.date}>{post.date}</time>
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
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
