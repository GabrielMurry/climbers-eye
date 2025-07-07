import { Boulder } from "../../utils/types/boulder";

export type Queries = {
  searchQuery?: string;
  minGradeIndex?: number;
  maxGradeIndex?: number;
  ordering?: string;
  activity?: string | null;
  status?: string;
  circuit?: number | null;
  excludeIds?: number[];
};

export type Path = {
  spraywallId?: number;
  boulderId?: number;
  circuitId?: number;
  sendId?: number;
  gymId?: number;
};

export type Data = {
  name: string;
  description: string;
  publish: boolean;
  matching: boolean;
  feetFollowHands: boolean;
  kickboardOn: boolean;
  url: string;
  width: number;
  height: number;
  setter: number;
  spraywall: number;
};
