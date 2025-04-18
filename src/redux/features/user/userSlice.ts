import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../utils/types/user";
import * as SecureStore from "expo-secure-store";

const initialState = {
  object: {} as User,
  isSignedIn: false,
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
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    resetUser: (state) => {
      state.object = initialState.object;
    },
  },
});

export const { setUser, updateUser, setIsSignedIn, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
