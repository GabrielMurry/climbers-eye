import { createSlice } from "@reduxjs/toolkit";
import { boulderGrades } from "../../../utils/constants/boulderConstants";

const initialState = {
  sortBy: "grade",
  minGradeIndex: 0,
  maxGradeIndex: boulderGrades.length - 1,
  activity: null,
  climbType: "boulder",
  climbStatus: "all",
  circuits: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setMinGradeIndex: (state, action) => {
      state.minGradeIndex = action.payload;
    },
    setMaxGradeIndex: (state, action) => {
      state.maxGradeIndex = action.payload;
    },
    setActivity: (state, action) => {
      state.activity = action.payload;
    },
    setClimbType: (state, action) => {
      state.climbType = action.payload;
    },
    setClimbStatus: (state, action) => {
      state.climbStatus = action.payload;
    },
    appendCircuit: (state, action) => {
      state.circuits.push(action.payload);
    },
    removeCircuit: (state, action) => {
      const id = action.payload;
      state.circuits = state.circuits.filter((circuit) => circuit.id !== id);
    },
    resetCircuits: (state) => {
      state.circuits = [];
    },
    resetFilters: (state) => {
      // Mutating each field back to its initial value
      state.sortBy = initialState.sortBy;
      state.minGradeIndex = initialState.minGradeIndex;
      state.maxGradeIndex = initialState.maxGradeIndex;
      state.activity = initialState.activity;
      state.climbType = initialState.climbType;
      state.climbStatus = initialState.climbStatus;
      state.circuits = [...initialState.circuits]; // Reset to an empty array
    },
  },
});

export const {
  setSortBy,
  setMinGradeIndex,
  setMaxGradeIndex,
  setActivity,
  setClimbType,
  setClimbStatus,
  appendCircuit,
  removeCircuit,
  resetCircuits,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
