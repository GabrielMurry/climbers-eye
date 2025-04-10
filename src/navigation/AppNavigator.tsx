import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  ActivityIndicator,
  ImageSourcePropType,
  StatusBar,
  Text,
  View,
} from "react-native";
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
import OneScreen from "../screens/OneScreen";
import TwoScreen from "../screens/TwoScreen";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  Main: NavigatorScreenParams<InnerStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type InnerStackParamList = {
  One: undefined;
  Two: {
    source: ImageSourcePropType;
    start: { x: number; y: number; width: number; height: number };
  };
};

const InnerStack = createNativeStackNavigator<InnerStackParamList>();

const GreenSquare = ({ transition }: { transition: boolean }) => {
  const height = useSharedValue(100);

  // When transition value changes
  useEffect(() => {
    if (transition) {
      height.value = withTiming(200);
    } else {
      height.value = withTiming(100);
    }
  }, [transition]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    // <Animated.View
    //   style={[
    //     {
    //       position: "absolute",
    //       bottom: 0,
    //       left: 0,
    //       right: 0,
    //     },
    //     animatedStyle,
    //   ]}
    // />
    <Animated.Image
      source={require("../../images/photo.jpg")}
      style={[
        {
          width: 100,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        },
        animatedStyle,
      ]}
      resizeMode={"contain"}
    />
  );
};

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

  const InnerStackNavigator = () => {
    const [transition, setTransition] = useState(false);

    return (
      <>
        <InnerStack.Navigator
          // screenListeners={{
          //   transitionStart: () => {
          //     console.log("starting");
          //     setTransition(true);
          //   },
          //   transitionEnd: () => setTransition(false),
          // }}
          screenOptions={{ headerShown: false }}
        >
          <InnerStack.Screen
            name="One"
            component={OneScreen}
            listeners={{
              focus: () => setTransition(false),
            }}
          />
          <InnerStack.Screen
            name="Two"
            component={TwoScreen}
            options={
              {
                // presentation: "containedTransparentModal",
                // animation: "fade",
              }
            }
            listeners={{
              focus: () => setTransition(true),
            }}
          />
        </InnerStack.Navigator>
        <GreenSquare transition={transition} />
      </>
    );
  };

  const InnerComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* Stack that controls the screen above the green square */}
        <InnerStackNavigator />
      </View>
    );
  };

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
                        {/* <RootStack.Screen
                          name="Main"
                          component={InnerComponent}
                        /> */}
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
                            animationDuration: 100,
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
