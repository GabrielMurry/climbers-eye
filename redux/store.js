import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import thunk from "redux-thunk";
import {
  userReducer,
  gymReducer,
  spraywallReducer,
  boulderReducer,
} from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";

// Define the configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "userReducer",
    "gymReducer",
    "spraywallReducer",
    "boulderReducer",
  ], // only userReducer will be persisted
};

const rootReducer = combineReducers({
  userReducer,
  gymReducer,
  spraywallReducer,
  boulderReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // persist/PERSIST and persist/REHYDRATE are controlled by Redux Persist and known to be safe. Therefore, acceptable to ignore these serialization checks for these specific actions
      },
    }),
});

// Create a persistor for later use (e.g., in app entry point)
export const persistor = persistStore(store);
