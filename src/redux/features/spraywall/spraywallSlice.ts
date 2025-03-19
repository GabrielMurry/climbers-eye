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
      if (!state.selectedId) {
        state.selectedId = action.payload.id;
      }
    },
    setSpraywalls: (state, action: PayloadAction<Spraywall[]>) => {
      if (action.payload.length === 0) {
        state = initialState;
      } else {
        state.objects = action.payload;
        state.selectedId = action.payload[0].id;
      }
    },
    setSelectedSpraywallId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    resetSelectedSpraywallId: (state) => {
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
    removeSpraywalls: (state) => {
      state = initialState;
    },
  },
});

export const {
  appendSpraywall,
  setSpraywalls,
  setSelectedSpraywallId,
  resetSelectedSpraywallId,
  deleteSpraywall,
  updateSpraywall,
  removeSpraywalls,
} = spraywallSlice.actions;

export default spraywallSlice.reducer;
