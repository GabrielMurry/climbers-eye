import { RootState } from "../../store";

export const selectLikedBoulders = (state: RootState) => {
  return state.like.objects;
};

export const selectLikedBouldersCursor = (state: RootState) => {
  return state.like.cursor;
};

export const selectLikedBoulder = (state: RootState, id: number) => {
  return state.like.objects.find((boulder) => boulder.id === id);
};
