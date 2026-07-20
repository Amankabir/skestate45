# SK Estate 45 — Project Audit

**Date:** 2026-07-20  
**Stack:** Next.js 15.5.20 · React 19 · TypeScript (strict) · Tailwind CSS v4 · App Router  
**Backend:** `https://api.skestate45.com/` (Postman: `website.postman_collection20jul.json`)

---

## Executive Summary

The codebase is a polished **static luxury residential marketing prototype** with hardcoded Unsplash imagery and fabricated listings. The live backend is a **commercial office / retail rental CRM** (865 properties, 81 Delhi NCR areas, 7 property types). Production readiness requires replacing all dummy listing data with API data, adapting copy/UI to commercial rentals, and removing routes that have no backend support.

| Dimension | Grade | Notes |
|-----------|-------|-------|
| Visual / component structure | Strong | Feature folders, luxury design system |
| Data layer | Fail | 100% hardcoded constants |
| API integration | None | Postman present, zero wiring |
| TypeScript | Strong | Strict, no `any` |
| SEO scaffolding | Good | Metadata, JSON-LD, robots, sitemap — ghost URLs |
| Forms | Fail | Local `setSent(true)` only |
| Loading / error UX | Weak | Almost no skeletons / boundaries |
| Production readiness | Shell only | Needs full API cutover |

---

## 1. Backend API Inventory (Postman — all 11 endpoints)

| # | Folder | Method | Path | Auth | Notes |
|---|--------|--------|------|------|-------|
| 1 | Health | GET | `/health` | None | `{ status, timestamp }` |
| 2 | Areas | GET | `/api/website/areas` | None | `{ data: Area[] }` sorted A–Z |
| 3 | Areas | GET | `/api/website/areas/:id` | None | `{ data: Area }` |
| 4 | Amenities | GET | `/api/website/amenities` | None | `{ data: Amenity[] }` |
| 5 | Amenities | GET | `/api/website/amenities/:id` | None | `{ data: Amenity }` |
| 6 | Property Types | GET | `/api/website/property-types` | None | `{ data: PropertyType[] }` |
| 7 | Property Types | GET | `/api/website/property-types/:id` | None | `{ data: PropertyType }` |
| 8 | Properties | GET | `/api/website/properties` | None | Full list, sorted by name |
| 9 | Properties | GET | `/api/website/properties` + filters | None | See filter matrix |
| 10 | Properties | GET | `/api/website/properties/:id` | None | Detail payload |
| 11 | Enquiries | POST | `/api/website/enquiries` | None | Creates CRM lead |

### Property list filters

| Query | Purpose | Aliases |
|-------|---------|---------|
| `status` | Status filter (CSV) | — |
| `areaId` | Area ObjectId | — |
| `propertyTypeId` | Type ObjectId | — |
| `amenityIds` | Comma-separated (AND match) | — |
| `rent1Min` / `rent1Max` | Rent range | `minRent1`, `budgetMin` / `maxRent1`, `budgetMax` |
| `leaseTenureMin` / `leaseTenureMax` | Lease months | — |
| `sqFeetMin` / `sqFeetMax` | Size range | — |

### Observed live payload shapes

**Area / Amenity / PropertyType:** `{ id, name, createdAt, updatedAt }`

**Property (list + detail):**
```
id, name, area{id,name}, propertyType{id,name},
amenities[{id,name,value}], description, photos:string[],
address, rent1?, sqFeet?, leaseTenure?, securityDepositAmount?,
termsConditions?, status, createdAt, updatedAt
```

**Statuses observed:** `available`, `leased out by others`, `leased out by us`, `not contactable`, `not interested`

**Enquiry POST body:** required `name`, `phone`, `pageUrl`; optional `email`, `requirement`, `propertyId`, `referrer`  
**Enquiry 400:** `{ message: "Missing required fields: name, phone, pageUrl." }`  
**Property 404:** `{ message: "Property not found." }`

### Backend gaps (no endpoints)

- Pagination / `page` / `limit` / `total`
- Text search (`q`)
- Sorting options (API fixed: name A–Z)
- Slugs (IDs only)
- Projects / builders / floor plans
- Blogs / testimonials / FAQs / about CMS
- Area images, descriptions, geo, nearby
- Property nearby / share metadata
- Auth / refresh tokens (public API — none required)

### Live data quality (2026-07-20)

| Metric | Value |
|--------|-------|
| Areas | 81 |
| Amenities | 15 |
| Property types | 7 |
| Properties | 865 |
| With photos | 32 / 865 (~3.7%) |
| With amenities | 216 / 865 |
| With rent1 | 791 / 865 |
| With leaseTenure | 6 / 865 |

Photo URLs are hosted on `https://api.skestate45.com/uploads/properties/...`

---

## 2. Project Structure

```
app/              # App Router (pages, layout, robots, sitemap)
components/       # ~70 components (home, areas, projects, property*, layout, ui, about)
constants/        # ALL listing/marketing dummy data
hooks/            # Lenis, scroll, parallax, magnetic (magnetic unused)
lib/              # utils, SEO schemas, static getters
types/            # UI-oriented interfaces (residential model)
animations/       # Framer Reveal primitives
public/           # Minimal SVGs only
```

**No** `services/`, Context, Redux, Zustand, Route Handlers, or Server Actions.

---

## 3. Routes

### Implemented

`/`, `/about`, `/areas`, `/areas/[slug]`, `/projects`, `/projects/[slug]`, `/properties`, `/properties/[slug]`, robots, sitemap, default 404

### Missing (linked in nav/footer/sitemap)

`/contact`, `/blog`, `/amenities`, `/locations/*`, `/properties/featured|villas|penthouses|off-market`, `/careers`, `/press`, `/privacy`, `/terms`, `/brochure`, custom `app/not-found.tsx`

### Route model mismatch

UI uses **slugs** (`aurelia-penthouse`). API uses **ObjectIds**. Must switch to `/properties/[id]` and `/areas/[id]`.

---

## 4. Components

| Folder | Count | Status |
|--------|-------|--------|
| layout | 3 | Keep; update links |
| home | 16 | Wire to API; remove blog/project/testimonial fakes |
| about | 8 | Site config only (no CMS API) |
| areas | 16 | Over-built vs API (id+name only) — simplify |
| projects | 18 | **No backend** — retire from nav / redirect |
| properties / property / property-detail | 8 | Core integration target |
| ui | 3 | Extend with Empty/Error/Skeleton/Pagination |

**Duplicates:** lead forms ×3, sticky CTAs ×2, FAQ ×4, testimonials ×3

---

## 5. Hooks

| Hook | Status |
|------|--------|
| `useLenis`, `useScrolled`, `useMouseParallax` | Active |
| `useMagnetic` | Dead code |
| Data hooks (`useProperties`, etc.) | **Missing** |

---

## 6. Constants — Dummy Data

All of `constants/content.ts`, `properties.ts`, `areas.ts`, `projects.ts`, `about.ts` (team/awards), and fabricated contact stats in `site.ts` are placeholders (Unsplash URLs, fake prices, fake RERA).

`navigation.ts` points at many 404 routes.

---

## 7. Images

- `next/image` used widely; remote patterns only Unsplash
- Must allow `api.skestate45.com`
- Most listings have **empty** `photos[]` — need placeholder SVG fallback (not Unsplash stock as “real” property)

---

## 8. SEO

- Strengths: metadata templates, OG/Twitter, JSON-LD helpers, robots, sitemap
- Issues: ghost sitemap URLs; schema refs to missing `logo.png` / `og-image.jpg`; residential copy; no dynamic metadata from API yet

---

## 9. Performance / A11y / Quality

- Heavy client JS (Framer + Lenis + Swiper + GSAP)
- No `loading.tsx` / `error.tsx` at app root
- Lint clean; build succeeds as static SSG
- Partial `prefers-reduced-motion` support

---

## 10. Dependencies Gap

**Installed for integration:** `axios`, `axios-retry`, `zod`, `react-hook-form`, `@hookform/resolvers`

**Still optional:** toast (`sonner`), React Query (can use RSC + light client hooks)

---

## 11. Integration Strategy

1. Feature-module API layer under `services/` (project has no `src/`; keep root convention)
2. Domain types matching API (not residential beds/baths)
3. Server Components fetch where possible; client hooks for filters/URL sync
4. Client-side pagination + text search + sort (API lacks these)
5. Wire enquiry forms with RHF + Zod
6. Retire projects/blog routes from nav; document missing CMS APIs
7. Simplify area detail to API fields + related properties
8. Compute homepage stats from live counts

---

## 12. Risk Register

| Risk | Mitigation |
|------|------------|
| 865 properties, no pagination | Client page size + server cache; document need for API pagination |
| 96% properties without photos | Branded SVG placeholder |
| CRM shorthand descriptions | Display as-is; note content quality |
| Residential UI vs commercial data | Retheme copy to commercial leasing |
| Enquiry creates CRM leads | Real POST only from user forms |

---

**Audit complete. Proceed to Phase 2 — API architecture.**
