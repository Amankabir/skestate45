import { fetchAreaByIdApi, fetchAreasApi } from "./api";
import { mapArea, mapAreas } from "./mapper";
import type { Area } from "./types";

export async function getAreas(): Promise<Area[]> {
  const raw = await fetchAreasApi();
  return mapAreas(raw);
}

export async function getAreaById(id: string): Promise<Area> {
  const raw = await fetchAreaByIdApi(id);
  return mapArea(raw);
}
