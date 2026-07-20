import type { Metadata } from "next";
import { AreasDirectory } from "@/components/areas/AreasDirectory";
import { AreasHero } from "@/components/areas/AreasHero";
import { SITE } from "@/constants/site";
import { safeList } from "@/services/modules/common/safe";
import { getAreas } from "@/services/modules/areas";
import { getProperties } from "@/services/modules/property";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Areas | SK Estate",
  description:
    "Browse commercial property micro-markets across Delhi NCR covered by SK Estate.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: `Areas | ${SITE.name}`,
    description:
      "Explore localities with live commercial inventory across Delhi NCR.",
    url: `${SITE.url}/areas`,
  },
};

export default async function AreasPage() {
  const [areas, properties] = await Promise.all([
    safeList("getAreas", getAreas),
    safeList("getProperties", () => getProperties({ status: "available" })),
  ]);

  const counts: Record<string, number> = {};
  const covers: Record<string, string> = {};

  for (const p of properties) {
    counts[p.areaId] = (counts[p.areaId] ?? 0) + 1;
    if (p.primaryPhoto && !covers[p.areaId]) {
      covers[p.areaId] = p.primaryPhoto;
    }
  }

  const list = areas.map((a) => ({
    id: a.id,
    name: a.name,
    count: counts[a.id] ?? 0,
    cover: covers[a.id],
  }));

  return (
    <main id="main-content" className="bg-ivory">
      <AreasHero
        areaCount={areas.length}
        listingCount={properties.length}
      />
      <AreasDirectory areas={list} totalListings={properties.length} />
    </main>
  );
}
