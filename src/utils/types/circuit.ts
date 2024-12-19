import { Boulder } from "./boulder";

export type Circuit = {
  id: number;
  name: string;
  description: string;
  color: string;
  private: boolean;
  boulders: Boulder[];
  person: number;
  spraywall: number;
};
