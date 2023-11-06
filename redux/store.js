import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer, gymReducer, spraywallReducer } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";

const rootReducer = combineReducers({
  userReducer,
  gymReducer,
  spraywallReducer,
});

// Define the configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use preferred storage engine
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: [thunk, logger],
});

// Create a persistor for later use (e.g., in app entry point)
export const persistor = persistStore(store);
