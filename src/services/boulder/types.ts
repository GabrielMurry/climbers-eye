export type Queries = {
  searchQuery?: string;
  minGradeIndex?: number;
  maxGradeIndex?: number;
  sortBy?: string;
  activity?: string | null;
  status?: string;
  circuit?: number | null;
  excludeIds?: number[];
  page?: number;
};

export type Path = {
  spraywallId?: number;
  boulderId?: number;
  circuitId?: number;
};

export type CompositeData = {
  image: FormData;
  canvas: FormData;
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
