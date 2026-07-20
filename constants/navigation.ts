import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Residences",
    href: "/properties",
    children: [
      {
        label: "Featured Collection",
        href: "/properties/featured",
        description: "Hand-selected homes of exceptional character",
      },
      {
        label: "Villas & Estates",
        href: "/properties/villas",
        description: "Private grounds and architectural statements",
      },
      {
        label: "Penthouses",
        href: "/properties/penthouses",
        description: "Skyline living with curated interiors",
      },
      {
        label: "New Launches",
        href: "/projects",
        description: "Exclusive previews before public release",
      },
    ],
  },
  {
    label: "Locations",
    href: "/areas",
    children: [
      {
        label: "Dwarka",
        href: "/areas/dwarka",
        description: "Planned living at Delhi's western gateway",
      },
      {
        label: "Gurugram",
        href: "/locations/gurugram",
        description: "Golf Course Road & DLF precincts",
      },
      {
        label: "South Mumbai",
        href: "/locations/mumbai",
        description: "Marine Drive to Cuffe Parade",
      },
      {
        label: "All Areas",
        href: "/areas",
        description: "Browse every curated city guide",
      },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      {
        label: "Godrej South Estate",
        href: "/projects/godrej-south-delhi",
        description: "Luxury residences in Okhla, South Delhi",
      },
      {
        label: "All Projects",
        href: "/projects",
        description: "Browse landmark launches",
      },
    ],
  },
  {
    label: "Invest",
    href: "/#investment",
  },
  {
    label: "Journal",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Advisory Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  properties: [
    { label: "Buy", href: "/properties?intent=buy" },
    { label: "Rent", href: "/properties?intent=rent" },
    { label: "New Projects", href: "/projects" },
    { label: "Off-Market", href: "/properties/off-market" },
  ],
  areas: [
    { label: "Gurugram", href: "/locations/gurugram" },
    { label: "Mumbai", href: "/locations/mumbai" },
    { label: "Bengaluru", href: "/locations/bengaluru" },
    { label: "Goa", href: "/locations/goa" },
  ],
  quick: [
    { label: "Book a Visit", href: "/contact" },
    { label: "Download Brochure", href: "/brochure" },
    { label: "FAQs", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};
