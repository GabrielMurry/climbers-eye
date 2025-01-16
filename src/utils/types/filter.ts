export type Filter = {
  search: string;
  sortBy: string;
  minGradeIndex: number;
  maxGradeIndex: number;
  activity: string | null;
  climbType: string;
  climbStatus: string;
  circuit: number | null;
  excludeIds: number[];
};
