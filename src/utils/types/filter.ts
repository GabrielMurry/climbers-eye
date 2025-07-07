export type Filter = {
  search: string;
  ordering: string;
  minGradeIndex: number;
  maxGradeIndex: number;
  activity: string | null;
  climbType: string;
  climbStatus: string;
  circuit: number | null;
};
