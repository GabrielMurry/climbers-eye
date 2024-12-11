import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Spraywall } from "../../../utils/types/spraywall";

const initialState = {
  objects: [] as Spraywall[], // Use a type assertion for the array
  selectedId: null as number | null,
};

export const spraywallSlice = createSlice({
  name: "spraywall",
  initialState,
  reducers: {
    appendSpraywall: (state, action: PayloadAction<Spraywall>) => {
      state.objects.push(action.payload);
    },
    setSpraywalls: (state, action: PayloadAction<Spraywall[]>) => {
      state.objects = action.payload;
    },
    setSpraywallIndex: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    resetSpraywallIndex: (state) => {
      if (state.objects.length !== 0) {
        state.selectedId = state.objects[0].id;
      } else {
        state.selectedId = initialState.selectedId;
      }
    },
    deleteSpraywall: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.objects = state.objects.filter((spraywall) => spraywall.id !== id);
    },
    updateSpraywall: {
      reducer: (
        state,
        action: PayloadAction<{ id: number; updates: Partial<Spraywall> }>
      ) => {
        const { id, updates } = action.payload;
        const spraywall = state.objects.find(
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
