export const GymType = {
  Commercial: "commercial",
  Home: "home",
} as const;

export type GymTypeType = (typeof GymType)[keyof typeof GymType];

export type Gym = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  place_id: number;
  type: GymTypeType;
  date_created: string;
};
