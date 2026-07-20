/**
 * Atmospheric UI imagery for homepage sections (not listing data).
 * Listing photos always prefer live API `photos` when available.
 */
export const HOME_VISUALS = {
  hero:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80",
  heroAlt: "Modern commercial office interior with natural light",
  cta:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=2000&q=80",
  why:
    "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80",
  areas: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80",
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=80",
    "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=900&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900&q=80",
  ],
  types: {
    default:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80",
    furnished:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    semi:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
    bareshell:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
    retail:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    shop:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80",
    godown:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    restaurant:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
  },
} as const;

export function typeVisual(name: string): string {
  const key = name.toLowerCase();
  if (key.includes("furnish") && key.includes("semi")) return HOME_VISUALS.types.semi;
  if (key.includes("furnish")) return HOME_VISUALS.types.furnished;
  if (key.includes("bare")) return HOME_VISUALS.types.bareshell;
  if (key.includes("retail")) return HOME_VISUALS.types.retail;
  if (key.includes("shop")) return HOME_VISUALS.types.shop;
  if (key.includes("godown")) return HOME_VISUALS.types.godown;
  if (key.includes("restaurant")) return HOME_VISUALS.types.restaurant;
  return HOME_VISUALS.types.default;
}
