import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Boulder } from "../../../utils/types/boulder";

type InitialStateLogbook = {
  objects: Boulder[];
  cursor?: string | null;
};

// Define the initial state using that type
const initialState: InitialStateLogbook = {
  objects: [] as Boulder[],
  cursor: null,
};

export const logbookSlice = createSlice({
  name: "logbookBoulders",
  initialState,
  reducers: {
    appendLogbookBoulders: (
      state,
      action: PayloadAction<{ boulders: Boulder[]; cursor: string | null }>
    ) => {
      state.objects.push(...action.payload.boulders); // Directly mutates the array
      state.cursor = action.payload.cursor;
    },
    addNewLogbookBoulder: (state, action: PayloadAction<Boulder>) => {
      state.objects.unshift(action.payload);
    },
    resetLogbookBoulders: (state) => {
      state.objects = [] as Boulder[];
      state.cursor = null;
    },
    deleteLogbookBoulder: (state, action: PayloadAction<Boulder>) => {
      state.objects = state.objects.filter(
        (boulder) => boulder.id !== action.payload.id
      );
    },
  },
});

export const {
  appendLogbookBoulders,
  addNewLogbookBoulder,
  resetLogbookBoulders,
  deleteLogbookBoulder,
} = logbookSlice.actions;

export default logbookSlice.reducer;
