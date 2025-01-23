import { RootState } from "../../store";

export const selectBoulders = (state: RootState) => {
  return state.boulder.objects;
};

export const selectBoulder = (state: RootState, id: number) => {
  return state.boulder.objects.find((boulder) => boulder.id === id)!;
};
