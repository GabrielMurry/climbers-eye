import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../utils/types/user";

const initialState = {
  object: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.object = action.payload;
    },
    updateUser: (state, action) => {
      if (state.object) Object.assign(state.object, action.payload);
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
