import type { NamedEntity } from "@/services/modules/common/types";

export type PropertyTypeDto = NamedEntity;

export interface PropertyTypeEntity {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
