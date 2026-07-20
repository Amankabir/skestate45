"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaCardProps {
  id: string;
  name: string;
  count: number;
  cover?: string;
  fallbackIndex?: number;
  badge?: string;
}

export function AreaCard({
  id,
  name,
  count,
  cover,
  badge,
}: AreaCardProps) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(cover) && !failed;

  return (
    <Link
      href={`/areas/${id}`}
      aria-label={`${name}, ${count} spaces available`}
      className="group relative flex aspect-[16/11] flex-col overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:aspect-[5/4]"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(145deg,#0a1a2f_0%,#1a3a5c_55%,#0f2744_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(184,151,90,0.35), transparent 42%), radial-gradient(circle at 85% 75%, rgba(212,196,168,0.16), transparent 38%)",
        }}
        aria-hidden
      />

      {showPhoto ? (
        <Image
          src={cover!}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-pearl/20 bg-pearl/10 text-champagne backdrop-blur-sm transition group-hover:border-gold/50 group-hover:text-gold md:h-20 md:w-20">
            <Home className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="font-ui text-[0.6rem] uppercase tracking-[0.18em] text-pearl/45">
            Photo coming soon
          </span>
        </div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent"
        aria-hidden
      />

      {badge ? (
        <span className="font-ui absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-navy-deep">
          {badge}
        </span>
      ) : null}

      <div className="relative z-10 mt-auto flex items-end justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0 pr-2">
          <h3 className="font-display text-xl leading-snug text-pearl md:text-2xl">
            {name}
          </h3>
          <p className="font-ui mt-2 inline-flex rounded-full border border-pearl/20 bg-pearl/10 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-champagne backdrop-blur-sm">
            {count} available
          </p>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pearl/30 bg-pearl/10 text-pearl backdrop-blur-sm transition",
            "group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep",
          )}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
