import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Circuit } from "../../../utils/types/circuit";

const initialState = {
  objects: [] as Circuit[],
};

export const circuitSlice = createSlice({
  name: "circuits",
  initialState,
  reducers: {
    setCircuits: (state, action: PayloadAction<Circuit[]>) => {
      state.objects = action.payload;
    },
    addNewCircuit: (state, action: PayloadAction<Circuit>) => {
      state.objects.unshift(action.payload);
    },
    resetCircuits: (state) => {
      state = initialState;
    },
    updateCircuit: {
      reducer: (
        state,
        action: PayloadAction<{ circuitId: number; updates: Partial<Circuit> }>
      ) => {
        const { circuitId, updates } = action.payload;
        const circuit = state.objects.find(
          (circuit) => circuit.id === circuitId
        );

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
        const circuit = state.objects.find(
          (circuit) => circuit.id === circuitId
        );

        if (circuit) {
          circuit.boulderIds.push(boulderId);
        } else {
          console.warn(
            "Attempted to add boulder to circuit. Circuit not found."
          );
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
        const circuit = state.objects.find(
          (circuit) => circuit.id === circuitId
        );

        if (circuit) {
          const index = circuit.boulderIds.indexOf(boulderId);
          if (index > -1) {
            circuit.boulderIds.splice(index, 1);
          } else {
            console.warn(
              "Attempted to find index of boulder ID in circuit.boulderIds array. Index not found."
            );
          }
        } else {
          console.warn(
            "Attempted to remove boulder from circuit. Circuit not found."
          );
        }
      },
      prepare: (circuitId: number, boulderId: number) => {
        return { payload: { circuitId, boulderId } };
      },
    },
    deleteCircuit: (state, action: PayloadAction<number>) => {
      state.objects = state.objects.filter(
        (circuit) => circuit.id !== action.payload
      );
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
