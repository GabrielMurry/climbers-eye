import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Circuit } from "../../../utils/types/circuit";

const initialState: Circuit[] = [];

export const circuitSlice = createSlice({
  name: "circuits",
  initialState,
  reducers: {
    setCircuits: (state, action: PayloadAction<Circuit[]>) => {
      state = action.payload;
    },
    addNewCircuit: (state, action: PayloadAction<Circuit>) => {
      state.unshift(action.payload);
    },
    resetCircuits: (state) => {
      state = [];
    },
    updateCircuit: {
      reducer: (
        state,
        action: PayloadAction<{ circuitId: number; updates: Partial<Circuit> }>
      ) => {
        const { circuitId, updates } = action.payload;
        const circuit = state.find((circuit) => circuit.id === circuitId);

        if (circuit) {
          // Update fields (everything other than boulders) using Object.assign
          Object.assign(circuit, updates);
        }
      },
      prepare: (circuitId: number, updates: Partial<Circuit>) => {
        return { payload: { circuitId, updates } };
      },
    },
    addBoulderToCircuit: {
      reducer: (
        state,
        action: PayloadAction<{ circuitId: number; boulderId: number }>
      ) => {
        const { circuitId, boulderId } = action.payload;
        const circuit = state.find((circuit) => circuit.id === circuitId);

        if (circuit) {
          circuit.boulders = [...circuit.boulders, boulderId];
        }
      },
      prepare: (circuitId: number, boulderId: number) => {
        return { payload: { circuitId, boulderId } };
      },
    },
    removeBoulderFromCircuit: {
      reducer: (
        state,
        action: PayloadAction<{ circuitId: number; boulderId: number }>
      ) => {
        const { circuitId, boulderId } = action.payload;
        const circuit = state.find((circuit) => circuit.id === circuitId);

        if (circuit) {
          circuit.boulders = circuit.boulders.filter(
            (circuitBoulderId) => circuitBoulderId !== boulderId
          );
        }
      },
      prepare: (circuitId: number, boulderId: number) => {
        return { payload: { circuitId, boulderId } };
      },
    },
    deleteCircuit: (state, action: PayloadAction<number>) => {
      state = state.filter((circuit) => circuit.id !== action.payload);
    },
  },
});

export const {
  setCircuits,
  addNewCircuit,
  resetCircuits,
  updateCircuit,
  addBoulderToCircuit,
  removeBoulderFromCircuit,
  deleteCircuit,
} = circuitSlice.actions;

export default circuitSlice.reducer;
