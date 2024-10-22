import { createSlice } from "@reduxjs/toolkit";

export const circuitSlice = createSlice({
  name: "circuit",
  initialState: { circuits: [] },
  reducers: {
    setCircuits: (state, action) => {
      state.circuits = action.payload;
    },
    addNewCircuit: (state, action) => {
      state.circuits.unshift(action.payload);
    },
    resetCircuits: (state) => {
      state.circuits = [];
    },
    updateCircuit: {
      reducer: (state, action) => {
        const { circuitId, updates } = action.payload;
        const circuit = state.circuits.find(
          (circuit) => circuit.id === circuitId
        );

        if (circuit) {
          // Update fields (everything other than boulders) using Object.assign
          Object.assign(circuit, updates);
        }
      },
      prepare: (circuitId, updates) => {
        return { payload: { circuitId, updates } };
      },
    },
    addBoulderToCircuit: {
      reducer: (state, action) => {
        const { circuitId, boulderId } = action.payload;
        const circuit = state.circuits.find(
          (circuit) => circuit.id === circuitId
        );

        if (circuit) {
          circuit.boulders = [...circuit.boulders, boulderId];
        }
      },
      prepare: (circuitId, boulderId) => {
        return { payload: { circuitId, boulderId } };
      },
    },
    removeBoulderFromCircuit: {
      reducer: (state, action) => {
        const { circuitId, boulderId } = action.payload;
        const circuit = state.circuits.find(
          (circuit) => circuit.id === circuitId
        );

        if (circuit) {
          circuit.boulders = circuit.boulders.filter(
            (circuitBoulderId) => circuitBoulderId !== boulderId
          );
        }
      },
      prepare: (circuitId, boulderId) => {
        return { payload: { circuitId, boulderId } };
      },
    },
    deleteCircuit: (state, action) => {
      state.circuits = state.circuits.filter(
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
