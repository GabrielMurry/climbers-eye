import { RootState } from "../../store";

export const selectGym = (state: RootState) => {
  return state.gym.object;
};
