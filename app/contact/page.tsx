import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/ContactPageView";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact | SK Estate",
  description:
    "Enquire about commercial offices and retail spaces across Delhi NCR. Call, WhatsApp, or send a requirement.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description:
      "Talk to SK Estate about furnished offices, retail, and commercial spaces across Delhi NCR.",
    url: `${SITE.url}/contact`,
  },
};

interface PageProps {
  searchParams: Promise<{ propertyId?: string }>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const { propertyId } = await searchParams;

  return <ContactPageView propertyId={propertyId} />;
}
