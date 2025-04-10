export type Circuit = {
  id: number;
  name: string;
  description: string;
  color: string;
  private: boolean;
  boulderIds: number[];
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
