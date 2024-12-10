import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Boulder } from "../../../utils/types/boulder";

// Define the initial state using that type
const initialState: Boulder[] = [];

export const boulderSlice = createSlice({
  name: "boulders",
  initialState,
  reducers: {
    appendBoulders: (state, action: PayloadAction<Boulder[]>) => {
      state.push(...action.payload); // Directly mutates the array
    },
    addNewBoulder: (state, action: PayloadAction<Boulder>) => {
      state.unshift(action.payload);
    },
    resetBoulders: () => {
      return [];
    },
    updateBoulder: {
      reducer: (
        state,
        action: PayloadAction<{ id: number; updates: Partial<Boulder> }>
      ) => {
        const { id, updates } = action.payload; // Destructure payload prepared by 'prepare'
        const boulder = state.find((boulder) => boulder.id === id);

        if (boulder) {
          Object.assign(boulder, updates); // Apply the updates
        }
      },
      prepare: (id: number, updates: Partial<Boulder>) => {
        return { payload: { id, updates } }; // Automatically format the payload
      },
    },
    deleteBoulder: (state, action) => {
      state = state.filter((boulder) => boulder.id !== action.payload);
    },
  },
});

export const {
  appendBoulders,
  addNewBoulder,
  resetBoulders,
  updateBoulder,
  deleteBoulder,
} = boulderSlice.actions;

export default boulderSlice.reducer;
