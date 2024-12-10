import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { ActivityIndicator, StatusBar } from "react-native";
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
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export type RootStackParamList = {
  AuthStack: undefined;
  GymStack: { screen: string };
  SpraywallStack: undefined;
  CameraStack: undefined;
  Tabs: undefined;
  BoulderStack: undefined;
  ProfileStack: undefined;
  CircuitStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const checkCredentials = async () => {
  // Checks expirations of tokens
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return false;
  }

  const { exp: accessExp } = jwtDecode(accessToken);
  const { exp: refreshExp } = jwtDecode(refreshToken);
  if (accessExp === undefined || refreshExp === undefined) return false;

  const currentTime = Date.now() / 1000; // Current time in seconds since epoch

  // If both tokens have expired, return false
  if (accessExp < currentTime && refreshExp < currentTime) {
    return false;
  }

  return true;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        setHasCredentials(await checkCredentials());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    determineInitialRoute();
  }, []);

  if (isLoading) {
    // Render a loading screen while user's credentials are being determined
    return <ActivityIndicator />;
  }
  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <FontProvider>
              <NavigationContainer>
                {hasCredentials ? (
                  // Main Stack
                  <>
                    <StatusBar barStyle={"dark-content"} />
                    <Stack.Navigator initialRouteName={"Tabs"}>
                      <Stack.Screen
                        name="Tabs"
                        options={{
                          headerShown: false,
                        }}
                      >
                        {({ navigation }) => <Tabs navigation={navigation} />}
                      </Stack.Screen>
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
                  </>
                ) : (
                  // Authentication Stack
                  <Stack.Navigator initialRouteName={"AuthStack"}>
                    {/* Screens */}
                    <Stack.Screen
                      name="AuthStack"
                      component={AuthStack}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                )}
              </NavigationContainer>
            </FontProvider>
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
