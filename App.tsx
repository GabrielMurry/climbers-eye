import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
