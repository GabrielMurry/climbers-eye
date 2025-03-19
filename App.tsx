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
import TabsStack, { TabsStackParamList } from "./src/navigation/tabs/TabsStack";
import { PersistGate } from "redux-persist/integration/react";
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
import AuthNavigator from "./src/navigation/AuthStack";
import { checkCredentials } from "./src/utils/auth";
import MapStack, { MapStackParamList } from "./src/navigation/MapStack";
import ModalScreen from "./src/screens/modal/ModalScreen";
import { ModalOptionsProvider } from "./src/contexts/ModalOptionsContext";
import { ModalFullScreenImageProvider } from "./src/contexts/ModalFullScreenImageContext";
import { CameraProvider } from "./src/contexts/CameraContext";
import BoulderImageFullScreen from "./src/screens/boulder/BoulderImageFullScreen";

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  GymStack: NavigatorScreenParams<GymStackParamsList>;
  SpraywallStack: NavigatorScreenParams<SpraywallStackParamList>;
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  BoulderStack: NavigatorScreenParams<BoulderStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  CircuitStack: NavigatorScreenParams<CircuitStackParamList>;
  MapStack: NavigatorScreenParams<MapStackParamList>;
  Modal: undefined;
  BoulderImageFull: {
    boulderUri: string;
    spraywallUri: string;
    width: number;
    height: number;
  };
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
            <ModalOptionsProvider>
              <ModalFullScreenImageProvider>
                <NavigationContainer>
                  <CameraProvider>
                    <>
                      <StatusBar barStyle={"dark-content"} />
                      <RootStack.Navigator
                        initialRouteName={"AuthStack"}
                        screenOptions={{ headerShown: false }}
                      >
                        <RootStack.Screen
                          name="AuthStack"
                          component={AuthNavigator}
                        />
                        <RootStack.Screen
                          name="TabsStack"
                          component={TabsStack}
                        />
                        <RootStack.Screen
                          name="GymStack"
                          component={GymStack}
                        />
                        <RootStack.Screen
                          name="SpraywallStack"
                          component={SpraywallStack}
                        />
                        <RootStack.Screen
                          name="BoulderStack"
                          component={BoulderStack}
                        />
                        <RootStack.Screen
                          name="ProfileStack"
                          component={ProfileStack}
                        />
                        <RootStack.Screen
                          name="CircuitStack"
                          component={CircuitStack}
                        />
                        <RootStack.Screen
                          name="MapStack"
                          component={MapStack}
                        />
                        <RootStack.Screen
                          name="Modal"
                          component={ModalScreen}
                          options={{
                            presentation: "containedTransparentModal",
                            animation: "fade",
                          }}
                        />
                        <RootStack.Screen
                          name="BoulderImageFull"
                          component={BoulderImageFullScreen}
                          options={{
                            animation: "fade",
                          }}
                        />
                      </RootStack.Navigator>
                    </>
                  </CameraProvider>
                </NavigationContainer>
              </ModalFullScreenImageProvider>
            </ModalOptionsProvider>
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
