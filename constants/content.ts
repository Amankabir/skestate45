import type {
  BlogPost,
  FAQItem,
  InvestmentMetric,
  Location,
  Project,
  Property,
  PropertyType,
  Testimonial,
  WhyChooseItem,
} from "@/types";

export const LOCATIONS: Location[] = [
  {
    id: "gurugram",
    name: "Gurugram",
    city: "Delhi NCR",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    propertyCount: 86,
    tagline: "Where ambition meets architecture",
    href: "/locations/gurugram",
  },
  {
    id: "mumbai",
    name: "South Mumbai",
    city: "Maharashtra",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    propertyCount: 54,
    tagline: "Sea-facing elegance, timeless prestige",
    href: "/locations/mumbai",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    city: "Karnataka",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    propertyCount: 72,
    tagline: "Garden city estates for modern pioneers",
    href: "/locations/bengaluru",
  },
  {
    id: "goa",
    name: "North Goa",
    city: "Goa",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    propertyCount: 31,
    tagline: "Coastal sanctuaries, privately held",
    href: "/locations/goa",
  },
];

export const PROPERTIES: Property[] = [
  {
    id: "aurelia-penthouse",
    title: "Aurelia Sky Penthouse",
    location: "Golf Course Road, Gurugram",
    city: "Gurugram",
    price: 125000000,
    priceLabel: "₹12.5 Cr",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: 6200,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
    ],
    badge: "Exclusive",
    featured: true,
    intent: "buy",
    href: "/properties/aurelia-penthouse",
  },
  {
    id: "marina-villa",
    title: "Marina Crest Villa",
    location: "Juhu, Mumbai",
    city: "Mumbai",
    price: 280000000,
    priceLabel: "₹28 Cr",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: 9800,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=80",
    ],
    badge: "Waterfront",
    featured: true,
    intent: "buy",
    href: "/properties/marina-villa",
  },
  {
    id: "orchid-estate",
    title: "Orchid Grove Estate",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    price: 89000000,
    priceLabel: "₹8.9 Cr",
    type: "Luxury Home",
    beds: 4,
    baths: 4,
    area: 5400,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
    ],
    badge: "New",
    featured: true,
    intent: "buy",
    href: "/properties/orchid-estate",
  },
  {
    id: "casa-serena",
    title: "Casa Serena",
    location: "Anjuna, Goa",
    city: "Goa",
    price: 65000000,
    priceLabel: "₹6.5 Cr",
    type: "Villa",
    beds: 3,
    baths: 4,
    area: 4100,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1400&q=80",
    ],
    badge: "Retreat",
    featured: true,
    intent: "buy",
    href: "/properties/casa-serena",
  },
];

export const PROPERTY_TYPES: PropertyType[] = [
  {
    id: "apartment",
    name: "Apartments",
    description: "Refined vertical living in landmark towers",
    count: 214,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    href: "/properties?type=apartment",
  },
  {
    id: "villa",
    name: "Villas",
    description: "Private estates with architectural soul",
    count: 68,
    image:
      "https://images.unsplash.com/photo-1613977257363-707bafffa8ad?w=900&q=80",
    href: "/properties?type=villa",
  },
  {
    id: "commercial",
    name: "Commercial",
    description: "Prime addresses for enduring enterprise",
    count: 42,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    href: "/properties?type=commercial",
  },
  {
    id: "office",
    name: "Offices",
    description: "Workspaces designed for quiet authority",
    count: 37,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    href: "/properties?type=office",
  },
  {
    id: "plots",
    name: "Plots",
    description: "Land parcels in tomorrow's corridors",
    count: 95,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
    href: "/properties?type=plots",
  },
  {
    id: "farmhouse",
    name: "Farm Houses",
    description: "Countryside sanctuaries near the city",
    count: 28,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    href: "/properties?type=farmhouse",
  },
  {
    id: "builder-floor",
    name: "Builder Floors",
    description: "Independent floors with boutique scale",
    count: 51,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    href: "/properties?type=builder-floor",
  },
  {
    id: "luxury-homes",
    name: "Luxury Homes",
    description: "Signature residences beyond category",
    count: 33,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    href: "/properties?type=luxury",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "godrej-south-delhi",
    name: "Godrej South Estate",
    builder: "Godrej Properties",
    location: "Okhla, South Delhi",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
    launchDate: "Dec 2028",
    priceFrom: "From ₹6.5 Cr",
    status: "Under Construction",
    href: "/projects/godrej-south-delhi",
  },
  {
    id: "the-monarch",
    name: "The Monarch",
    builder: "DLF Limited",
    location: "Sector 42, Gurugram",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
    launchDate: "Q4 2026",
    priceFrom: "From ₹4.8 Cr",
    status: "Pre-Launch",
    href: "/projects/the-monarch",
  },
  {
    id: "azure-bay",
    name: "Azure Bay Residences",
    builder: "Lodha Group",
    location: "Worli, Mumbai",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    launchDate: "Q1 2027",
    priceFrom: "From ₹9.2 Cr",
    status: "Invitation Only",
    href: "/projects/azure-bay",
  },
  {
    id: "emerald-park",
    name: "Emerald Park",
    builder: "Prestige Group",
    location: "Sarjapur, Bengaluru",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=80",
    launchDate: "Q3 2026",
    priceFrom: "From ₹2.9 Cr",
    status: "Soft Launch",
    href: "/projects/emerald-park",
  },
];

export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    id: "01",
    year: "01",
    title: "Private Market Access",
    description:
      "Off-market listings and invitation-only launches reserved for SK Estate clients before they reach the public domain.",
  },
  {
    id: "02",
    year: "02",
    title: "Architectural Curation",
    description:
      "Every residence is vetted for craftsmanship, light, proportion, and long-term value — not merely square footage.",
  },
  {
    id: "03",
    year: "03",
    title: "White-Glove Concierge",
    description:
      "From private viewings to legal diligence and interior introductions, our advisors orchestrate every detail.",
  },
  {
    id: "04",
    year: "04",
    title: "Investment Intelligence",
    description:
      "Data-backed guidance on rental yields, corridor growth, and appreciation — so beauty and returns align.",
  },
];

export const INVESTMENT_METRICS: InvestmentMetric[] = [
  {
    id: "roi",
    label: "Average ROI",
    value: "14.2%",
    change: "+2.1% YoY",
    description: "Across curated residential portfolios in Tier-1 corridors",
  },
  {
    id: "yield",
    label: "Rental Yield",
    value: "4.8%",
    change: "Stable",
    description: "Premium furnished residences in Gurugram & Mumbai",
  },
  {
    id: "growth",
    label: "Price Growth",
    value: "18%",
    change: "5-Year Avg",
    description: "Landmark micro-markets tracked by our research desk",
  },
  {
    id: "appreciation",
    label: "Future Outlook",
    value: "22%",
    change: "Projected",
    description: "Expected appreciation in emerging luxury corridors",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ananya Mehta",
    role: "Founder, Atelier Studio",
    quote:
      "SK Estate understood that we weren't buying walls — we were choosing a way of living. The penthouse they found feels like it was designed for us years ago.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    property: "Aurelia Sky Penthouse",
  },
  {
    id: "2",
    name: "Rohan Kapoor",
    role: "Managing Partner, Meridian Capital",
    quote:
      "Their investment brief was clearer than most fund decks I've reviewed. We acquired two assets — both already outperforming projections.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    property: "Portfolio Advisory",
  },
  {
    id: "3",
    name: "Priya & Arjun Shah",
    role: "Private Clients",
    quote:
      "From the first private viewing to keys in hand, every moment felt considered. This is how luxury real estate should feel — calm, precise, human.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    property: "Marina Crest Villa",
  },
];

export const BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "The Quiet Luxury of North-Facing Residences",
    excerpt:
      "Why orientation, light, and silence have become the new markers of premium living in India's densest cities.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
    category: "Design",
    date: "June 12, 2026",
    readTime: "6 min",
    href: "/blog/quiet-luxury-north-facing",
  },
  {
    id: "2",
    title: "Gurugram's Next Decade: Corridors Worth Watching",
    excerpt:
      "A research-led look at micro-markets poised for appreciation — and the residences already defining them.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
    category: "Insights",
    date: "May 28, 2026",
    readTime: "8 min",
    href: "/blog/gurugram-next-decade",
  },
  {
    id: "3",
    title: "How to Read a Luxury Floor Plan Like an Architect",
    excerpt:
      "Proportion, circulation, and the spaces between rooms — a guide for discerning buyers.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000&q=80",
    category: "Guide",
    date: "May 4, 2026",
    readTime: "5 min",
    href: "/blog/read-luxury-floor-plan",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "1",
    question: "How does SK Estate select its residences?",
    answer:
      "Every home enters our collection only after architectural review, location diligence, and value assessment. We decline more properties than we list — ensuring what you see reflects our standard, not market volume.",
  },
  {
    id: "2",
    question: "Can I access off-market and pre-launch inventory?",
    answer:
      "Yes. Registered clients receive private previews of invitation-only launches and discreet off-market opportunities through our advisory desk, often weeks before public announcement.",
  },
  {
    id: "3",
    question: "Do you assist with financing and legal diligence?",
    answer:
      "Our concierge coordinates preferred banking partners, title verification, and legal counsel. You remain in control — we simply remove friction from every step.",
  },
  {
    id: "4",
    question: "Is a private viewing available on short notice?",
    answer:
      "Most featured residences can be arranged within 24–48 hours. For ultra-private estates, we schedule discreet appointments aligned with the owner's preferences.",
  },
  {
    id: "5",
    question: "Do you work with NRI and international clients?",
    answer:
      "Extensively. We support remote walkthroughs, power-of-attorney coordination, and end-to-end acquisition for clients across the US, UK, Middle East, and Southeast Asia.",
  },
];

export const TRUST_LOGOS = [
  "DLF",
  "Lodha",
  "Prestige",
  "Godrej",
  "Tata",
  "Oberoi",
  "Brigade",
  "Sobha",
];
