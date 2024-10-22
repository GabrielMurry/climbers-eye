import { createSlice } from "@reduxjs/toolkit";
import { boulderGrades } from "../../../utils/constants/boulderConstants";

const initialState = {
  sortBy: "grade",
  minGradeIndex: 0,
  maxGradeIndex: boulderGrades.length - 1,
  activity: null,
  climbType: "boulder",
  climbStatus: "all",
  circuit: null,
  excludeIds: [],
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
    setCircuit: (state, action) => {
      state.circuit = action.payload;
    },
    resetCircuit: (state) => {
      state.circuit = initialState.circuit;
    },
    appendExcludeId: (state, action) => {
      state.excludeIds.push(action.payload);
    },
    resetExcludeIds: (state) => {
      state.excludeIds = initialState.excludeIds;
    },
    resetFilters: (state) => {
      // Mutating each field back to its initial value
      state.sortBy = initialState.sortBy;
      state.minGradeIndex = initialState.minGradeIndex;
      state.maxGradeIndex = initialState.maxGradeIndex;
      state.activity = initialState.activity;
      state.climbType = initialState.climbType;
      state.climbStatus = initialState.climbStatus;
      state.circuit = initialState.circuit;
      state.excludeIds = initialState.excludeIds;
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
  setCircuit,
  resetCircuit,
  appendExcludeId,
  resetExcludeIds,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
