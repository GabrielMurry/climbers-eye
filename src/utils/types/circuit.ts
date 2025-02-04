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

export const CircuitColors = [
  "green",
  "blue",
  "yellow",
  "pink",
  "orange",
  "red",
  "purple",
  "black",
] as const;

export type CircuitColor = (typeof CircuitColors)[number];
