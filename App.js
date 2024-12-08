import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Tabs from "./src/navigation/tabs/Tabs";
import { PersistGate } from "redux-persist/integration/react";
import { FontProvider } from "./src/contexts/FontContext";
import AuthStack from "./src/navigation/AuthStack";
import GymStack from "./src/navigation/GymStack";
import SpraywallStack from "./src/navigation/SpraywallStack";
import CameraStack from "./src/navigation/CameraStack";
import BoulderStack from "./src/navigation/BoulderStack";
import ProfileStack from "./src/navigation/ProfileStack";
import CircuitStack from "./src/navigation/CircuitStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAsyncStorage } from "./src/utils/initializeAuth";
import { jwtDecode } from "jwt-decode";

const Stack = createNativeStackNavigator();

const checkTokenExpiry = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return false;
  }

  const { exp: accessExp } = jwtDecode(accessToken);
  const { exp: refreshExp } = jwtDecode(refreshToken);

  const currentTime = Date.now() / 1000; // Current time in seconds since epoch

  // If both tokens have expired, return false
  if (accessExp < currentTime && refreshExp < currentTime) {
    return false;
  }

  return true;
};

const hasCredentials = async () => {
  const isTokenValid = await checkTokenExpiry();
  if (isTokenValid) {
    return true;
  } else {
    return false;
  }
};

export default function App() {
  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <FontProvider>
              <NavigationContainer>
                <StatusBar barStyle={"dark-content"} />
                <Stack.Navigator
                  initialRouteName={hasCredentials ? "Tabs" : "AuthStack"}
                >
                  {/* Screens */}
                  <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="GymStack"
                    component={GymStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SpraywallStack"
                    component={SpraywallStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CameraStack"
                    component={CameraStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Tabs"
                    options={{
                      headerShown: false,
                    }}
                  >
                    {({ navigation }) => <Tabs navigation={navigation} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="BoulderStack"
                    component={BoulderStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CircuitStack"
                    component={CircuitStack}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </FontProvider>
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
