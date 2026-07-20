import type { NamedEntity } from "@/services/modules/common/types";

export type AmenityDto = NamedEntity;

export interface Amenity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
