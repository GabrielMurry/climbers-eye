import { RootState } from "../../store";

export const selectBoulders = (state: RootState) => {
  return state.boulder.objects;
};
