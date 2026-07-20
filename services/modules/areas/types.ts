import type { NamedEntity } from "@/services/modules/common/types";

export type AreaDto = NamedEntity;

export interface Area {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
