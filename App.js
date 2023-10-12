import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AddGymScreen from "./screens/AddGymScreen";
import EditBoulderScreen from "./screens/EditBoulderScreen";
import CameraScreen from "./screens/CameraScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SubmitCodeScreen from "./screens/SubmitCodeScreen";
import { useEffect } from "react";
import SendScreen from "./screens/SendScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FilterScreen from "./screens/FilterScreen";
import CircuitScreen from "./screens/CircuitScreen";
import BoulderStatsScreen from "./screens/BoulderStatsScreen";
import FilterCircuitScreen from "./screens/FilterCircuitScreen";
import CropImageScreen from "./screens/profile/edit/CropImageScreen";
import EditGymScreen from "./screens/EditGymScreen";
import AddNewSprayWallScreen from "./screens/AddNewSprayWallScreen";
import EditSprayWallScreen from "./screens/EditSprayWallScreen";
import EditScreen from "./screens/EditScreen";
import EditProfileScreen from "./screens/profile/edit/EditProfileScreen";
import EditNameScreen from "./screens/profile/edit/EditNameScreen";
import { StatusBar } from "react-native";
import SwitchGymScreen from "./screens/profile/edit/SwitchGymScreen";
import AddNewCircuitScreen from "./screens/AddNewCircuitScreen";
import ReportBoulderScreen from "./screens/ReportBoulderScreen";
import BoulderUserSendsScreen from "./screens/BoulderUserSendsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Tabs from "./navigation/Tabs";
import { clearAsyncStorage, getTempCsrfToken } from "./utils/initializeAuth";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    clearAsyncStorage();
    getTempCsrfToken();
  }, []);

  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar barStyle={"dark-content"} />
            {/* Preload the images before rendering any screen */}
            <Stack.Navigator>
              {/* Screens */}
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="SubmitCode"
                component={SubmitCodeScreen}
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="ConfirmEmail"
                component={ConfirmEmailScreen}
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
              <Stack.Screen name="AddGym" component={AddGymScreen} />
              <Stack.Screen name="EditGym" component={EditGymScreen} />
              <Stack.Screen name="Edit" component={EditScreen} />
              <Stack.Screen
                name="AddNewSprayWall"
                component={AddNewSprayWallScreen}
              />
              <Stack.Screen
                name="EditSprayWall"
                component={EditSprayWallScreen}
              />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen
                name="Tabs"
                options={{
                  headerShown: false,
                  gestureEnabled: false, // Disable gestures for tab screens
                }}
              >
                {({ navigation }) => <Tabs navigation={navigation} />}
              </Stack.Screen>
              <Stack.Screen name="EditBoulder" component={EditBoulderScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="EditName" component={EditNameScreen} />
              <Stack.Screen name="CropImage" component={CropImageScreen} />
              <Stack.Screen name="Filter" component={FilterScreen} />
              <Stack.Screen
                name="FilterCircuit"
                component={FilterCircuitScreen}
              />
              <Stack.Screen name="Send" component={SendScreen} />
              <Stack.Screen name="Circuit" component={CircuitScreen} />
              <Stack.Screen
                name="AddNewCircuit"
                component={AddNewCircuitScreen}
              />
              <Stack.Screen
                name="BoulderStats"
                component={BoulderStatsScreen}
              />
              <Stack.Screen name="SwitchGym" component={SwitchGymScreen} />
              <Stack.Screen
                name="ReportBoulder"
                component={ReportBoulderScreen}
              />
              <Stack.Screen
                name="BoulderUserSends"
                component={BoulderUserSendsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
