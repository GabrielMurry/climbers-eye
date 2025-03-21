import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ActivityIndicator, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabsStack, { TabsStackParamList } from "./tabs/TabsStack";
import { AuthStackParamList } from "./AuthStack";
import GymStack, { GymStackParamsList } from "./GymStack";
import SpraywallStack, { SpraywallStackParamList } from "./SpraywallStack";
import BoulderStack, { BoulderStackParamList } from "./BoulderStack";
import ProfileStack, { ProfileStackParamList } from "./ProfileStack";
import CircuitStack, { CircuitStackParamList } from "./CircuitStack";
import { useEffect, useState } from "react";
import AuthNavigator from "./AuthStack";
import { checkCredentials } from "../utils/auth";
import MapStack, { MapStackParamList } from "./MapStack";
import ModalScreen from "../screens/modal/ModalScreen";
import { ModalOptionsProvider } from "../contexts/ModalOptionsContext";
import { ModalFullScreenImageProvider } from "../contexts/ModalFullScreenImageContext";
import { CameraProvider } from "../contexts/CameraContext";
import BoulderImageFullScreen from "../screens/boulder/BoulderImageFullScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsSignedIn } from "../redux/features/user/userSlice";

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

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      setIsLoading(true);
      try {
        dispatch(setIsSignedIn(await checkCredentials()));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Splash screen
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <ModalOptionsProvider>
          <ModalFullScreenImageProvider>
            <NavigationContainer>
              <CameraProvider>
                <>
                  <StatusBar barStyle={"dark-content"} />
                  <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    {!isSignedIn ? (
                      <RootStack.Screen
                        name="AuthStack"
                        component={AuthNavigator}
                      />
                    ) : (
                      <>
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
                      </>
                    )}
                  </RootStack.Navigator>
                </>
              </CameraProvider>
            </NavigationContainer>
          </ModalFullScreenImageProvider>
        </ModalOptionsProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
