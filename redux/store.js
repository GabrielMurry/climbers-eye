import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer, gymReducer, spraywallReducer } from "./reducers";

const rootReducer = combineReducers({
  userReducer,
  gymReducer,
  spraywallReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
