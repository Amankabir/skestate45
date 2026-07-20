import type { Metadata } from "next";
import { AmenitiesDirectory } from "@/components/amenities/AmenitiesDirectory";
import { AmenitiesHero } from "@/components/amenities/AmenitiesHero";
import { SITE } from "@/constants/site";
import { safeList } from "@/services/modules/common/safe";
import { getAmenities } from "@/services/modules/amenities";
import { getProperties } from "@/services/modules/property";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Amenities | SK Estate",
  description:
    "Filter commercial properties by amenities such as pantry, conference room, lift, and more.",
  alternates: { canonical: "/amenities" },
  openGraph: {
    title: `Amenities | ${SITE.name}`,
    description:
      "Browse amenity filters and open matching commercial spaces across Delhi NCR.",
    url: `${SITE.url}/amenities`,
  },
};

export default async function AmenitiesPage() {
  const [amenities, properties] = await Promise.all([
    safeList("getAmenities", getAmenities),
    safeList("getProperties", () => getProperties({ status: "available" })),
  ]);

  const counts: Record<string, number> = {};
  for (const p of properties) {
    for (const a of p.amenities) {
      counts[a.id] = (counts[a.id] ?? 0) + 1;
    }
  }

  const list = amenities.map((a) => ({
    id: a.id,
    name: a.name,
    count: counts[a.id] ?? 0,
  }));

  return (
    <main id="main-content" className="bg-ivory">
      <AmenitiesHero
        amenityCount={amenities.length}
        listingCount={properties.length}
      />
      <AmenitiesDirectory
        amenities={list}
        totalListings={properties.length}
      />
    </main>
  );
}
