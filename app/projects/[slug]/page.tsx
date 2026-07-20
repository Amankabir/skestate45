import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** No project-detail endpoint — send users to property search */
export default async function ProjectDetailPage({ params }: PageProps) {
  await params;
  redirect("/properties");
}
