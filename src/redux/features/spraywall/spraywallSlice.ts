import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Spraywall = {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
  gym: number;
};

const initialState = {
  spraywalls: [] as Spraywall[], // Use a type assertion for the array
  spraywallIndex: 0,
};

export const spraywallSlice = createSlice({
  name: "spraywall",
  initialState,
  reducers: {
    appendSpraywall: (state, action: PayloadAction<Spraywall>) => {
      state.spraywalls.push(action.payload);
    },
    setSpraywalls: (state, action: PayloadAction<Spraywall[]>) => {
      state.spraywalls = action.payload;
    },
    setSpraywallIndex: (state, action: PayloadAction<number>) => {
      state.spraywallIndex = action.payload;
    },
    resetSpraywallIndex: (state) => {
      state.spraywallIndex = 0;
    },
    deleteSpraywall: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.spraywalls = state.spraywalls.filter(
        (spraywall) => spraywall.id !== id
      );
    },
    updateSpraywall: {
      reducer: (
        state,
        action: PayloadAction<{ id: number; updates: Partial<Spraywall> }>
      ) => {
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
      prepare: (id: number, updates: Partial<Spraywall>) => {
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
