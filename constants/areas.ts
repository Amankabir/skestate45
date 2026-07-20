import type { AreaPage } from "@/types";

export const AREAS: Record<string, AreaPage> = {
  dwarka: {
    slug: "dwarka",
    name: "Dwarka",
    city: "New Delhi",
    state: "Delhi",
    tagline: "Planned living at the capital's western gateway",
    heroImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=85",
    videoPoster:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=85",
    videoUrl: "https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&rel=0",
    propertyCount: 142,
    avgPrice: "₹11,800",
    avgPriceValue: 11800,
    priceUnit: "per sq.ft",
    rentalYield: "3.9%",
    growthPercent: "12.4%",
    metaTitle: "Property in Dwarka | Luxury Apartments & Homes for Sale",
    metaDescription:
      "Discover luxury apartments and premium homes in Dwarka, New Delhi. Explore price trends, connectivity, builders, amenities, and curated residences with SK Estate advisory.",
    keywords: [
      "property in Dwarka",
      "luxury apartments in Dwarka",
      "flats for sale in Dwarka",
      "Dwarka real estate",
      "homes in Dwarka Delhi",
      "Dwarka property prices",
      "invest in Dwarka",
      "Dwarka sector apartments",
    ],
    geo: { lat: 28.5921, lng: 77.046 },
    mapEmbedQuery: "Dwarka%20New%20Delhi",
    aboutIntro:
      "Dwarka is one of Asia's largest planned residential sub-cities — a meticulously designed expanse of wide avenues, green belts, and sector living that has become Delhi's preferred address for balanced urban life.",
    aboutSections: [
      {
        id: "history",
        title: "History & Character",
        content:
          "Conceived as a satellite city to decongest central Delhi, Dwarka evolved through deliberate urban planning rather than organic sprawl. Its sector grid, underground utilities, and generous open spaces give the area a composure rare in the capital — ordered, green, and quietly prestigious.",
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        content:
          "Life in Dwarka moves at a refined pace. Morning walks along landscaped parks, evenings at Sector 21's retail promenades, and weekends at Pacific or Vegas Mall define a lifestyle that values space, safety, and community. Premium societies offer clubhouses, pools, and concierge living without the density of South Delhi.",
      },
      {
        id: "connectivity",
        title: "Connectivity",
        content:
          "The Blue Line Metro stitches Dwarka to Connaught Place and Noida, while the Airport Express Line places IGI Airport within a short ride. Dwarka Expressway and NH-48 open corridors to Gurugram, making the sub-city a strategic node for professionals who live in Delhi and work across NCR.",
      },
      {
        id: "growth",
        title: "Future Growth",
        content:
          "The Dwarka Expressway corridor, Aerocity expansion, and continued metro densification position Dwarka for sustained appreciation. Government-led infrastructure and limited new land supply in core sectors support long-term value for both end-users and investors seeking rental stability.",
      },
    ],
    highlights: [
      {
        id: "metro",
        title: "Metro Connectivity",
        description: "Blue Line & Airport Express with multiple stations across sectors",
        value: "8+ Stations",
        icon: "train",
      },
      {
        id: "airport",
        title: "Airport Access",
        description: "IGI Terminals reachable via Airport Express and expressway",
        value: "15–25 min",
        icon: "plane",
      },
      {
        id: "schools",
        title: "Premier Schools",
        description: "DPS, GD Goenka, Modern, and international curricula nearby",
        value: "40+ Schools",
        icon: "graduation",
      },
      {
        id: "hospitals",
        title: "Healthcare",
        description: "Manipal, Venkateshwar, Aakash and multi-specialty care",
        value: "12+ Hospitals",
        icon: "hospital",
      },
      {
        id: "malls",
        title: "Retail & Malls",
        description: "Pacific, Vegas, City Centre and high-street retail hubs",
        value: "6 Major Malls",
        icon: "shopping",
      },
      {
        id: "business",
        title: "Business Hub",
        description: "Proximity to Aerocity, Cyber City & central business districts",
        value: "NCR Linked",
        icon: "briefcase",
      },
      {
        id: "parks",
        title: "Parks & Greenery",
        description: "Sector parks, sports complexes and landscaped green belts",
        value: "30% Green",
        icon: "trees",
      },
      {
        id: "dining",
        title: "Dining Scene",
        description: "Cafés, fine dining and family restaurants across sectors",
        value: "200+ Spots",
        icon: "utensils",
      },
    ],
    properties: [
      {
        id: "dwarka-skyline",
        title: "Skyline Residences",
        location: "Sector 19B, Dwarka",
        city: "Dwarka",
        price: 18500000,
        priceLabel: "₹1.85 Cr",
        type: "Apartment",
        beds: 3,
        baths: 3,
        area: 1650,
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1400&q=80",
        ],
        badge: "Featured",
        featured: true,
        href: "/properties/dwarka-skyline",
      },
      {
        id: "dwarka-orchid",
        title: "Orchid Court",
        location: "Sector 12, Dwarka",
        city: "Dwarka",
        price: 24200000,
        priceLabel: "₹2.42 Cr",
        type: "Luxury Apartment",
        beds: 4,
        baths: 4,
        area: 2100,
        images: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
        ],
        badge: "Premium",
        featured: true,
        href: "/properties/dwarka-orchid",
      },
      {
        id: "dwarka-emerald",
        title: "Emerald Heights",
        location: "Sector 6, Dwarka",
        city: "Dwarka",
        price: 12800000,
        priceLabel: "₹1.28 Cr",
        type: "Apartment",
        beds: 3,
        baths: 2,
        area: 1420,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1400&q=80",
          "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=80",
        ],
        badge: "Value Pick",
        featured: true,
        href: "/properties/dwarka-emerald",
      },
      {
        id: "dwarka-palace",
        title: "Palace View Penthouse",
        location: "Sector 18A, Dwarka",
        city: "Dwarka",
        price: 45000000,
        priceLabel: "₹4.50 Cr",
        type: "Penthouse",
        beds: 4,
        baths: 5,
        area: 3800,
        images: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80",
        ],
        badge: "Exclusive",
        featured: true,
        href: "/properties/dwarka-palace",
      },
    ],
    priceTrends: [
      { year: "2020", price: 8200 },
      { year: "2021", price: 8800 },
      { year: "2022", price: 9500 },
      { year: "2023", price: 10200 },
      { year: "2024", price: 11000 },
      { year: "2025", price: 11500 },
      { year: "2026", price: 11800 },
    ],
    priceMetrics: [
      {
        id: "avg",
        label: "Average Price",
        value: "₹11,800",
        change: "+7.3% YoY",
        description: "Per sq.ft across premium residential inventory",
      },
      {
        id: "yield",
        label: "Rental Yield",
        value: "3.9%",
        change: "Stable",
        description: "Furnished 3BHK apartments in core sectors",
      },
      {
        id: "growth",
        label: "5-Year Growth",
        value: "44%",
        change: "Cumulative",
        description: "Appreciation since 2021 in Sector 6–19 belt",
      },
      {
        id: "demand",
        label: "Demand Index",
        value: "High",
        change: "End-user led",
        description: "Strong absorption from Delhi & Gurugram professionals",
      },
    ],
    investmentIntro:
      "Dwarka combines planned infrastructure, airport adjacency, and constrained supply — a rare triad that supports both lifestyle living and measured capital growth.",
    investmentPoints: [
      {
        id: "roi",
        title: "Balanced ROI Profile",
        description:
          "Steady rental demand from airline staff, consultants, and NCR professionals delivers predictable yields alongside mid-teens appreciation potential on the expressway corridor.",
      },
      {
        id: "infra",
        title: "Infrastructure Momentum",
        description:
          "Dwarka Expressway, metro extensions, and Aerocity's commercial densification continue to compress travel times and elevate catchment desirability.",
      },
      {
        id: "govt",
        title: "Government Projects",
        description:
          "DDA planning frameworks, smart-city upgrades, and transit-oriented development policies reinforce Dwarka's status as a long-horizon residential market.",
      },
      {
        id: "future",
        title: "Future Development",
        description:
          "Limited vacant plots in mature sectors and rising redevelopment of older societies create scarcity — historically a powerful driver of premium pricing.",
      },
    ],
    nearbyAreas: [
      {
        id: "janakpuri",
        name: "Janakpuri",
        slug: "janakpuri",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
        distance: "8 km",
        avgPrice: "₹14,200/sq.ft",
        tagline: "Established west Delhi living",
      },
      {
        id: "rohini",
        name: "Rohini",
        slug: "rohini",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
        distance: "18 km",
        avgPrice: "₹9,800/sq.ft",
        tagline: "North-west planned sectors",
      },
      {
        id: "pitampura",
        name: "Pitampura",
        slug: "pitampura",
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
        distance: "16 km",
        avgPrice: "₹11,200/sq.ft",
        tagline: "Metro-linked family neighbourhoods",
      },
      {
        id: "paschim-vihar",
        name: "Paschim Vihar",
        slug: "paschim-vihar",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
        distance: "12 km",
        avgPrice: "₹13,500/sq.ft",
        tagline: "Quiet residential prestige",
      },
    ],
    builders: [
      {
        id: "dda",
        name: "DDA",
        logoText: "DDA",
        projects: 48,
        experience: "60+ yrs",
        highlight: "Planned housing authority",
      },
      {
        id: "godrej",
        name: "Godrej Properties",
        logoText: "Godrej",
        projects: 3,
        experience: "30+ yrs",
        highlight: "Premium residential launches",
      },
      {
        id: "m3m",
        name: "M3M India",
        logoText: "M3M",
        projects: 5,
        experience: "15+ yrs",
        highlight: "Expressway corridor projects",
      },
      {
        id: "ats",
        name: "ATS Infrastructure",
        logoText: "ATS",
        projects: 4,
        experience: "25+ yrs",
        highlight: "Mid to luxury apartments",
      },
      {
        id: "indiabulls",
        name: "Indiabulls Real Estate",
        logoText: "IBREL",
        projects: 2,
        experience: "20+ yrs",
        highlight: "Landmark towers",
      },
      {
        id: "omaxe",
        name: "Omaxe Limited",
        logoText: "Omaxe",
        projects: 6,
        experience: "35+ yrs",
        highlight: "Integrated developments",
      },
    ],
    amenities: [
      { id: "1", name: "Dwarka Sector 21 Metro", category: "Metro", distance: "0.8 km", travelTime: "4 min" },
      { id: "2", name: "IGI Airport T3", category: "Airport", distance: "9 km", travelTime: "20 min" },
      { id: "3", name: "Pacific Mall", category: "Mall", distance: "3 km", travelTime: "10 min" },
      { id: "4", name: "Manipal Hospital", category: "Hospital", distance: "2.5 km", travelTime: "8 min" },
      { id: "5", name: "DPS Dwarka", category: "School", distance: "1.2 km", travelTime: "5 min" },
      { id: "6", name: "PVR Vegas Mall", category: "Cinema", distance: "4 km", travelTime: "12 min" },
      { id: "7", name: "Sector 11 Sports Complex", category: "Gym", distance: "1.5 km", travelTime: "6 min" },
      { id: "8", name: "Café Culture Hub", category: "Restaurant", distance: "2 km", travelTime: "7 min" },
    ],
    travelTimes: [
      { id: "1", destination: "Connaught Place", time: "35 min", mode: "Metro" },
      { id: "2", destination: "IGI Airport", time: "20 min", mode: "Car / Express" },
      { id: "3", destination: "Cyber City, Gurugram", time: "30 min", mode: "Expressway" },
      { id: "4", destination: "Aerocity", time: "18 min", mode: "Car" },
    ],
    gallery: [
      {
        id: "g1",
        src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
        alt: "Modern residential towers in Dwarka",
        caption: "Sector skyline at dusk",
      },
      {
        id: "g2",
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
        alt: "Urban architecture in Dwarka Delhi",
        caption: "Planned avenues & towers",
      },
      {
        id: "g3",
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
        alt: "Luxury apartment exterior Dwarka",
        caption: "Premium society living",
      },
      {
        id: "g4",
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
        alt: "Landscaped residence Dwarka",
        caption: "Green belt residences",
      },
      {
        id: "g5",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
        alt: "Interior living space luxury apartment",
        caption: "Refined interiors",
      },
      {
        id: "g6",
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80",
        alt: "Contemporary home architecture",
        caption: "Contemporary façades",
      },
    ],
    testimonials: [
      {
        id: "t1",
        name: "Neha & Vikram Malhotra",
        role: "Homeowners, Sector 19",
        quote:
          "We wanted space without leaving Delhi. Dwarka gave us parks, metro, and a home that still feels calm after three years — SK Estate made the search effortless.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        property: "Skyline Residences",
      },
      {
        id: "t2",
        name: "Arjun Khanna",
        role: "Aviation Executive",
        quote:
          "Airport proximity was non-negotiable. The advisory team mapped every sector against my commute — we closed on a 4BHK that has already appreciated meaningfully.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        property: "Orchid Court",
      },
      {
        id: "t3",
        name: "Meera Kapoor",
        role: "Investor",
        quote:
          "Dwarka's rental demand is quietly strong. SK Estate's yield brief was precise — my furnished apartment leased within two weeks of handover.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
        property: "Investment Advisory",
      },
    ],
    blogs: [
      {
        id: "b1",
        title: "Dwarka vs Gurugram: Where Should You Buy in 2026?",
        excerpt:
          "A clear comparison of lifestyle, yields, and appreciation across Delhi's western gateway and the Millennium City.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
        category: "Insights",
        date: "June 18, 2026",
        readTime: "7 min",
        href: "/blog/dwarka-vs-gurugram-2026",
      },
      {
        id: "b2",
        title: "Best Sectors in Dwarka for End-Users",
        excerpt:
          "From Sector 6 to 19B — which micro-markets offer the strongest blend of schools, parks, and resale liquidity.",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
        category: "Guide",
        date: "May 30, 2026",
        readTime: "6 min",
        href: "/blog/best-sectors-dwarka",
      },
      {
        id: "b3",
        title: "How the Dwarka Expressway Is Reshaping Prices",
        excerpt:
          "Corridor economics, travel-time compression, and what it means for apartments near the expressway belt.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        category: "Market",
        date: "May 9, 2026",
        readTime: "5 min",
        href: "/blog/dwarka-expressway-prices",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "Is Dwarka a good place to buy property in Delhi?",
        answer:
          "Yes. Dwarka offers planned infrastructure, strong metro and airport connectivity, established schools and healthcare, and relatively stable appreciation. It suits end-users seeking space and investors looking for rental demand from professionals across NCR.",
      },
      {
        id: "f2",
        question: "What is the average property price in Dwarka?",
        answer:
          "As of 2026, average residential prices in Dwarka hover around ₹11,800 per sq.ft for premium apartments, with variation by sector, society age, floor, and finishing. Penthouses and newer launches command a premium.",
      },
      {
        id: "f3",
        question: "Which sectors in Dwarka are best for luxury apartments?",
        answer:
          "Sectors 6, 12, 18, 19 and 19B are frequently preferred for premium societies, greenery, and resale liquidity. Exact choice depends on budget, metro access, and proximity to schools or the expressway.",
      },
      {
        id: "f4",
        question: "How far is Dwarka from IGI Airport?",
        answer:
          "Most Dwarka sectors are approximately 8–12 km from IGI Terminals, typically 15–25 minutes by car depending on traffic, or faster via the Airport Express Line from Sector 21.",
      },
      {
        id: "f5",
        question: "What rental yield can I expect in Dwarka?",
        answer:
          "Furnished 3BHK apartments in well-located societies commonly deliver around 3.5–4.2% gross rental yield, with stronger demand near metro stations and from aviation and consulting professionals.",
      },
      {
        id: "f6",
        question: "Can NRIs buy property in Dwarka?",
        answer:
          "Yes. NRIs can purchase residential property in Dwarka subject to FEMA guidelines. SK Estate assists with remote viewings, documentation, power of attorney coordination, and banking introductions.",
      },
    ],
  },
};

export const AREA_SLUGS = Object.keys(AREAS);
