import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spraywalls: [],
  spraywallIndex: 0,
};

export const spraywallSlice = createSlice({
  name: "spraywall",
  initialState,
  reducers: {
    appendSpraywall: (state, action) => {
      state.spraywalls.push(action.payload);
    },
    setSpraywalls: (state, action) => {
      state.spraywalls = action.payload;
    },
    setSpraywallIndex: (state, action) => {
      state.spraywallIndex = action.payload;
    },
    resetSpraywallIndex: (state) => {
      state.spraywallIndex = 0;
    },
    deleteSpraywall: (state, action) => {
      const id = action.payload;
      state.spraywalls = state.spraywalls.filter(
        (spraywall) => spraywall.id !== id
      );
    },
    updateSpraywall: {
      reducer: (state, action) => {
        const { id, updates } = action.payload;
        const spraywall = state.spraywalls.find(
          (spraywall) => spraywall.id === id
        );
        // Objects and arrays are passed by reference in JS.
        // This means that if we access or assign an object, we are working with the reference to the original object in memory, not a copy.
        if (spraywall) {
          Object.assign(spraywall, updates);
        }
      },
      prepare: (id, updates) => {
        return { payload: { id, updates } };
      },
    },
  },
});

export const {
  appendSpraywall,
  setSpraywalls,
  setSpraywallIndex,
  resetSpraywallIndex,
  deleteSpraywall,
  updateSpraywall,
} = spraywallSlice.actions;

export default spraywallSlice.reducer;
