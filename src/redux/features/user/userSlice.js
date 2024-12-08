import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      Object.assign(state.user, action.payload);
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
