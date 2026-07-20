import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search Properties | SK Estate",
  alternates: { canonical: "/search" },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Dedicated search route — mirrors /properties with URL sync */
export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value) qs.set(key, value);
    if (Array.isArray(value)) value.forEach((v) => qs.append(key, v));
  }
  const suffix = qs.toString();
  redirect(suffix ? `/properties?${suffix}` : "/properties");
}
