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
import Tabs, { TabsStackParamList } from "./src/navigation/tabs/Tabs";
import { PersistGate } from "redux-persist/integration/react";
import { FontProvider } from "./src/contexts/FontContext";
import { AuthStackParamList } from "./src/navigation/AuthStack";
import GymStack, { GymStackParamsList } from "./src/navigation/GymStack";
import SpraywallStack, {
  SpraywallStackParamList,
} from "./src/navigation/SpraywallStack";
import BoulderStack, {
  BoulderStackParamList,
} from "./src/navigation/BoulderStack";
import ProfileStack, {
  ProfileStackParamList,
} from "./src/navigation/ProfileStack";
import CircuitStack, {
  CircuitStackParamList,
} from "./src/navigation/CircuitStack";
import { useEffect, useState } from "react";
import CameraNavigator, {
  CameraStackParamList,
} from "./src/navigation/CameraStack";
import AuthNavigator from "./src/navigation/AuthStack";
import { checkCredentials } from "./src/utils/auth";
import MapStack, { MapStackParamList } from "./src/navigation/MapStack";

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  GymStack: NavigatorScreenParams<GymStackParamsList>;
  SpraywallStack: NavigatorScreenParams<SpraywallStackParamList>;
  CameraStack: NavigatorScreenParams<CameraStackParamList>;
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  BoulderStack: NavigatorScreenParams<BoulderStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  CircuitStack: NavigatorScreenParams<CircuitStackParamList>;
  MapStack: NavigatorScreenParams<MapStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

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
                <StatusBar barStyle={"dark-content"} />
                <RootStack.Navigator initialRouteName={"AuthStack"}>
                  <RootStack.Screen
                    name="AuthStack"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="TabsStack"
                    component={Tabs}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="GymStack"
                    component={GymStack}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="SpraywallStack"
                    component={SpraywallStack}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="CameraStack"
                    component={CameraNavigator}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="BoulderStack"
                    component={BoulderStack}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="CircuitStack"
                    component={CircuitStack}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="MapStack"
                    component={MapStack}
                    options={{ headerShown: false }}
                  />
                </RootStack.Navigator>
              </NavigationContainer>
            </FontProvider>
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
