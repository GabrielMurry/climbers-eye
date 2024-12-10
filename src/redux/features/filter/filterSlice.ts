import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boulderGrades } from "../../../utils/constants/boulderConstants";

type Filter = {
  sortBy: string;
  minGradeIndex: number;
  maxGradeIndex: number;
  activity: string | null;
  climbType: string;
  climbStatus: string;
  circuit: number | null;
  excludeIds: number[];
};

const initialState: Filter = {
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
  name: "filters",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setMinGradeIndex: (state, action: PayloadAction<number>) => {
      state.minGradeIndex = action.payload;
    },
    setMaxGradeIndex: (state, action: PayloadAction<number>) => {
      state.maxGradeIndex = action.payload;
    },
    setActivity: (state, action: PayloadAction<string | null>) => {
      state.activity = action.payload;
    },
    setClimbType: (state, action: PayloadAction<string>) => {
      state.climbType = action.payload;
    },
    setClimbStatus: (state, action: PayloadAction<string>) => {
      state.climbStatus = action.payload;
    },
    setCircuit: (state, action: PayloadAction<number>) => {
      state.circuit = action.payload;
    },
    resetCircuit: (state) => {
      state.circuit = initialState.circuit;
    },
    appendExcludeId: (state, action: PayloadAction<number>) => {
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
