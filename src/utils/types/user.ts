import { Gym } from "./gym";
import { Spraywall } from "./spraywall";

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  profilePicUrl: string;
  profilePicWidth: number;
  profilePicHeight: number;
  gym: Gym;
  spraywalls: Spraywall[];
};
