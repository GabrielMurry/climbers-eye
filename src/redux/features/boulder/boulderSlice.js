import { createSlice } from "@reduxjs/toolkit";

export const boulderSlice = createSlice({
  name: "boulder",
  initialState: { boulders: [] },
  reducers: {
    appendBoulders: (state, action) => {
      state.boulders.push(...action.payload); // Directly mutates the array
    },
    addNewBoulder: (state, action) => {
      state.boulders.unshift(action.payload);
    },
    resetBoulders: (state) => {
      state.boulders = [];
    },
    updateBoulder: {
      reducer: (state, action) => {
        const { id, updates } = action.payload; // Destructure payload prepared by 'prepare'
        const boulder = state.boulders.find((boulder) => boulder.id === id);
        console.log("-----");

        if (boulder) {
          Object.assign(boulder, updates); // Apply the updates
        }
      },
      prepare: (id, updates) => {
        return { payload: { id, updates } }; // Automatically format the payload
      },
    },
    deleteBoulder: (state, action) => {
      state.boulders = state.boulders.filter(
        (boulder) => boulder.id !== action.payload
      );
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
