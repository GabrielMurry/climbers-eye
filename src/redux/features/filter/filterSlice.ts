import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boulderGrades } from "../../../utils/constants/boulderConstants";
import { Filter } from "../../../utils/types/filter";

export const defaultFilters: Filter = {
  search: "",
  ordering: "grade",
  minGradeIndex: 0,
  maxGradeIndex: boulderGrades.length - 1,
  activity: null,
  climbType: "boulder",
  climbStatus: "all",
  circuit: null,
};

const initialState = {
  object: defaultFilters,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.object.search = action.payload;
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.object.ordering = action.payload;
    },
    setMinGradeIndex: (state, action: PayloadAction<number>) => {
      state.object.minGradeIndex = action.payload;
    },
    setMaxGradeIndex: (state, action: PayloadAction<number>) => {
      state.object.maxGradeIndex = action.payload;
    },
    setActivity: (state, action: PayloadAction<string | null>) => {
      state.object.activity = action.payload;
    },
    setClimbType: (state, action: PayloadAction<string>) => {
      state.object.climbType = action.payload;
    },
    setClimbStatus: (state, action: PayloadAction<string>) => {
      state.object.climbStatus = action.payload;
    },
    setCircuit: (state, action: PayloadAction<number>) => {
      state.object.circuit = action.payload;
    },
    resetCircuit: (state) => {
      state.object.circuit = initialState.object.circuit;
    },
    resetFilters: (state) => {
      // Mutating each field back to its initial value
      state.object.search = initialState.object.search;
      state.object.ordering = initialState.object.ordering;
      state.object.minGradeIndex = initialState.object.minGradeIndex;
      state.object.maxGradeIndex = initialState.object.maxGradeIndex;
      state.object.activity = initialState.object.activity;
      state.object.climbType = initialState.object.climbType;
      state.object.climbStatus = initialState.object.climbStatus;
      state.object.circuit = initialState.object.circuit;
    },
  },
});

export const {
  setSearch,
  setOrdering,
  setMinGradeIndex,
  setMaxGradeIndex,
  setActivity,
  setClimbType,
  setClimbStatus,
  setCircuit,
  resetCircuit,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
