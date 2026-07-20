export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface Location {
  id: string;
  name: string;
  city: string;
  image: string;
  propertyCount: number;
  tagline: string;
  href: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  priceLabel: string;
  type: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  badge?: string;
  featured?: boolean;
  href: string;
  intent?: "buy" | "rent";
  status?: string;
}

export interface PropertyDetail extends Property {
  slug: string;
  tagline: string;
  overview: string;
  highlights: string[];
  amenities: string[];
  nearby: { name: string; distance: string; type: string }[];
  floorPlanImage?: string;
  videoUrl?: string;
  mapQuery: string;
  geo: { lat: number; lng: number };
  facing?: string;
  furnishing?: string;
  parking?: string;
  floor?: string;
  age?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: FAQItem[];
}

export interface Project {
  id: string;
  name: string;
  builder: string;
  location: string;
  image: string;
  launchDate: string;
  priceFrom: string;
  status: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  property: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PropertyType {
  id: string;
  name: string;
  description: string;
  count: number;
  image: string;
  href: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  year?: string;
}

export interface InvestmentMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  description: string;
}

export interface AreaHighlight {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: string;
}

export interface AreaAboutSection {
  id: string;
  title: string;
  content: string;
}

export interface PriceTrendPoint {
  year: string;
  price: number;
}

export interface PriceTrendMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  description: string;
}

export interface InvestmentPoint {
  id: string;
  title: string;
  description: string;
}

export interface NearbyArea {
  id: string;
  name: string;
  slug: string;
  image: string;
  distance: string;
  avgPrice: string;
  tagline: string;
}

export interface AreaBuilder {
  id: string;
  name: string;
  logoText: string;
  projects: number;
  experience: string;
  highlight: string;
}

export interface NearbyAmenity {
  id: string;
  name: string;
  category: string;
  distance: string;
  travelTime: string;
}

export interface TravelTime {
  id: string;
  destination: string;
  time: string;
  mode: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface AreaPage {
  slug: string;
  name: string;
  city: string;
  state: string;
  tagline: string;
  heroImage: string;
  videoPoster: string;
  videoUrl: string;
  propertyCount: number;
  avgPrice: string;
  avgPriceValue: number;
  priceUnit: string;
  rentalYield: string;
  growthPercent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  geo: { lat: number; lng: number };
  mapEmbedQuery: string;
  aboutIntro: string;
  aboutSections: AreaAboutSection[];
  highlights: AreaHighlight[];
  properties: Property[];
  priceTrends: PriceTrendPoint[];
  priceMetrics: PriceTrendMetric[];
  investmentIntro: string;
  investmentPoints: InvestmentPoint[];
  nearbyAreas: NearbyArea[];
  builders: AreaBuilder[];
  amenities: NearbyAmenity[];
  travelTimes: TravelTime[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  faqs: FAQItem[];
}

export interface ProjectUnit {
  id: string;
  type: string;
  beds: number;
  carpetArea: number;
  superArea: number;
  price: string;
  priceValue: number;
  availability: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  type: string;
  area: string;
  image: string;
  pdfUrl: string;
}

export interface ProjectAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface LocationAdvantage {
  id: string;
  title: string;
  description: string;
  distance: string;
  time: string;
}

export interface BuilderProfile {
  name: string;
  logoText: string;
  founded: string;
  experience: string;
  completedProjects: number;
  ongoingProjects: number;
  awards: number;
  history: string;
  highlights: string[];
}

export interface ConstructionMilestone {
  id: string;
  phase: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  progress: number;
  description: string;
}

export interface PaymentPlanTier {
  id: string;
  name: string;
  downPayment: string;
  description: string;
  milestones: { label: string; percent: string }[];
  featured?: boolean;
}

export interface ProjectInvestmentMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  description: string;
}

export interface ProjectGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video" | "360";
}

export interface SimilarProject {
  id: string;
  name: string;
  builder: string;
  location: string;
  image: string;
  priceFrom: string;
  status: string;
  href: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  builder: string;
  builderLogoText: string;
  location: string;
  city: string;
  state: string;
  address: string;
  tagline: string;
  heroImage: string;
  videoUrl: string;
  startingPrice: string;
  startingPriceValue: number;
  reraNumber: string;
  possession: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  geo: { lat: number; lng: number };
  mapEmbedQuery: string;
  overview: string;
  highlights: string[];
  whyInvest: string[];
  units: ProjectUnit[];
  floorPlans: FloorPlan[];
  masterPlanImage: string;
  amenities: ProjectAmenity[];
  locationAdvantages: LocationAdvantage[];
  landmarks: { name: string; type: string; distance: string }[];
  builderProfile: BuilderProfile;
  construction: ConstructionMilestone[];
  paymentPlans: PaymentPlanTier[];
  investmentMetrics: ProjectInvestmentMetric[];
  gallery: ProjectGalleryItem[];
  similarProjects: SimilarProject[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  brochureUrl: string;
  priceListUrl: string;
}
