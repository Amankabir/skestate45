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
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Enquire", href: "/contact#enquiry" },
  ],
  properties: [
    { label: "All properties", href: "/properties" },
    { label: "Search", href: "/search" },
    { label: "Amenities", href: "/amenities" },
  ],
  areas: [
    { label: "Browse areas", href: "/areas" },
  ],
  quick: [
    { label: "Book a visit", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
  ],
};
