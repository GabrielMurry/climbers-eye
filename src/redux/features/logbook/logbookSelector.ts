import { RootState } from "../../store";

export const selectLogbookBoulders = (state: RootState) => {
  return state.like.objects;
};

export const selectLogbookBouldersCursor = (state: RootState) => {
  return state.like.cursor;
};

export const selectLogbookBoulder = (state: RootState, id: number) => {
  return state.like.objects.find((boulder) => boulder.id === id);
};
