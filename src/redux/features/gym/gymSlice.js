import { createSlice } from "@reduxjs/toolkit";

export const gymSlice = createSlice({
  name: "gym",
  initialState: { gym: {} },
  reducers: {
    setGym: (state, action) => {
      state.gym = action.payload;
    },
    updateGym: (state, action) => {
      Object.assign(state.gym, action.payload);
    },
  },
});

export const { setGym, updateGym } = gymSlice.actions;

export default gymSlice.reducer;
