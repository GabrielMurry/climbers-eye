import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gym } from "../../../utils/types/gym";

const initialState = {
  // object or props or fields??
  object: {} as Gym,
};

export const gymSlice = createSlice({
  name: "gym",
  initialState,
  reducers: {
    setGym: (state, action: PayloadAction<Gym>) => {
      state.object = action.payload;
    },
    updateGym: (state, action: PayloadAction<Partial<Gym>>) => {
      Object.assign(state.object, action.payload);
    },
  },
});

export const { setGym, updateGym } = gymSlice.actions;

export default gymSlice.reducer;
