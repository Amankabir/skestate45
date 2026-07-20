import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects | SK Estate",
  description:
    "Project catalogue is not available from the public API. Browse commercial properties instead.",
};

/** No projects endpoint in website API — redirect to properties */
export default function ProjectsPage() {
  redirect("/properties");
}
