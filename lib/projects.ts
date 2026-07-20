import { PROJECT_DETAILS, PROJECT_DETAIL_SLUGS } from "@/constants/projects";
import type { ProjectDetail } from "@/types";

/**
 * CMS / API-ready accessors for project detail pages.
 */
export function getAllProjectSlugs(): string[] {
  return PROJECT_DETAIL_SLUGS;
}

export function getProjectBySlug(slug: string): ProjectDetail | null {
  return PROJECT_DETAILS[slug] ?? null;
}

export function getAllProjectDetails(): ProjectDetail[] {
  return PROJECT_DETAIL_SLUGS.map((slug) => PROJECT_DETAILS[slug]);
}

export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  return getProjectBySlug(slug);
}
