import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Boulder } from "../../../utils/types/boulder";

type InitialStateLike = {
  objects: Boulder[];
  cursor?: string | null;
};

// Define the initial state using that type
const initialState: InitialStateLike = {
  objects: [] as Boulder[],
  cursor: null,
};

export const likeSlice = createSlice({
  name: "likedBoulders",
  initialState,
  reducers: {
    appendLikedBoulders: (
      state,
      action: PayloadAction<{ boulders: Boulder[]; cursor: string | null }>
    ) => {
      state.objects.push(...action.payload.boulders); // Directly mutates the array
      state.cursor = action.payload.cursor;
    },
    addNewLikedBoulder: (state, action: PayloadAction<Boulder>) => {
      state.objects.unshift(action.payload);
    },
    resetLikedBoulders: (state) => {
      state.objects = [] as Boulder[];
      state.cursor = null;
    },
    deleteLikedBoulder: (state, action: PayloadAction<Boulder>) => {
      state.objects = state.objects.filter(
        (boulder) => boulder.id !== action.payload.id
      );
    },
  },
});

export const {
  appendLikedBoulders,
  addNewLikedBoulder,
  resetLikedBoulders,
  deleteLikedBoulder,
} = likeSlice.actions;

export default likeSlice.reducer;
