import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gymReducer from "./features/gym/gymSlice";
import userReducer from "./features/user/userSlice";
import spraywallReducer from "./features/spraywall/spraywallSlice";
import filterReducer from "./features/filter/filterSlice";
import boulderReducer from "./features/boulder/boulderSlice";
import circuitReducer from "./features/circuit/circuitSlice";

// Define the configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "gym", "spraywall"],
};

// Combine reducers (features / slices)
const rootReducer = combineReducers({
  user: userReducer,
  gym: gymReducer,
  spraywall: spraywallReducer,
  filter: filterReducer,
  boulder: boulderReducer,
  circuit: circuitReducer,
});

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
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
