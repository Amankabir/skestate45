import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Properties",
    href: "/properties",
    children: [
      {
        label: "All available",
        href: "/properties",
        description: "Browse every commercial listing",
      },
      {
        label: "Search & filters",
        href: "/search",
        description: "Area, type, budget, and amenities",
      },
    ],
  },
  {
    label: "Areas",
    href: "/areas",
    children: [
      {
        label: "All areas",
        href: "/areas",
        description: "Delhi NCR micro-markets we cover",
      },
    ],
  },
  {
    label: "Amenities",
    href: "/amenities",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const FOOTER_LINKS = {
  explore: [
    { label: "All properties", href: "/properties" },
    { label: "Search & filters", href: "/search" },
    { label: "Areas", href: "/areas" },
    { label: "Amenities", href: "/amenities" },
    { label: "Featured spaces", href: "/#featured" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Send enquiry", href: "/contact#enquiry" },
    { label: "FAQs", href: "/#faq" },
    { label: "Book a visit", href: "/contact" },
  ],
} as const;

