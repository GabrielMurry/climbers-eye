import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import AddGymScreen from "./screens/gym/AddGymScreen";
import EditBoulderScreen from "./screens/boulder/EditBoulderScreen";
import CameraScreen from "./screens/camera/CameraScreen";
import ConfirmEmailScreen from "./screens/auth/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/auth/ResetPasswordScreen";
import SubmitCodeScreen from "./screens/auth/SubmitCodeScreen";
import SendBoulderScreen from "./screens/boulder/SendBoulderScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import CircuitScreen from "./screens/circuit/CircuitScreen";
import BoulderStatsScreen from "./screens/boulder/BoulderStatsScreen";
import FilterCircuitScreen from "./screens/circuit/FilterCircuitScreen";
import CropImageScreen from "./screens/profile/edit/CropImageScreen";
import EditGymScreen from "./screens/gym/EditGymScreen";
import AddNewSprayWallScreen from "./screens/spraywall/AddNewSprayWallScreen";
import EditProfileScreen from "./screens/profile/edit/EditProfileScreen";
import EditNameScreen from "./screens/profile/edit/EditNameScreen";
import { StatusBar } from "react-native";
import SwitchGymScreen from "./screens/profile/edit/SwitchGymScreen";
import AddNewCircuitScreen from "./screens/circuit/AddNewCircuitScreen";
import ReportBoulderScreen from "./screens/boulder/ReportBoulderScreen";
import BoulderUserSendsScreen from "./screens/boulder/BoulderUserSendsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Tabs from "./navigationTabs/Tabs";
import PrivacyPolicyScreen from "./screens/auth/PrivacyPolicyScreen";
import { PersistGate } from "redux-persist/integration/react";
import { FontProvider } from "./contexts/FontContext";
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import EditGymTypeScreen from "./screens/gym/EditGymTypeScreen";
import EditGymNameScreen from "./screens/gym/EditGymNameScreen";
import EditGymLocationScreen from "./screens/gym/EditGymLocationScreen";
import EditSpraywallScreen from "./screens/spraywall/EditSpraywallScreen";
import EditSpraywallNameScreen from "./screens/spraywall/EditSpraywallNameScreen";
import EditSpraywallImageScreen from "./screens/spraywall/EditSpraywallImageScreen";
import TermsAndConditionsScreen from "./screens/auth/TermsAndConditionsScreen";
import FilterHomeListScreen from "./screens/home/FilterHomeListScreen";

const Stack = createNativeStackNavigator();

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
                {/* Preload the images before rendering any screen */}
                <Stack.Navigator initialRouteName="AuthLoading">
                  {/* Screens */}
                  <Stack.Screen
                    name="AuthLoading"
                    component={AuthLoadingScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
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
                  <Stack.Screen
                    name="EditGymType"
                    component={EditGymTypeScreen}
                  />
                  <Stack.Screen
                    name="EditGymName"
                    component={EditGymNameScreen}
                  />
                  <Stack.Screen
                    name="EditGymLocation"
                    component={EditGymLocationScreen}
                  />
                  <Stack.Screen
                    name="AddNewSprayWall"
                    component={AddNewSprayWallScreen}
                  />
                  <Stack.Screen
                    name="EditSpraywall"
                    component={EditSpraywallScreen}
                  />
                  <Stack.Screen
                    name="EditSpraywallName"
                    component={EditSpraywallNameScreen}
                  />
                  <Stack.Screen
                    name="EditSpraywallImage"
                    component={EditSpraywallImageScreen}
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
                  <Stack.Screen
                    name="EditBoulder"
                    component={EditBoulderScreen}
                  />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                  />
                  <Stack.Screen name="EditName" component={EditNameScreen} />
                  <Stack.Screen name="CropImage" component={CropImageScreen} />
                  <Stack.Screen
                    name="FilterHomeList"
                    component={FilterHomeListScreen}
                  />
                  <Stack.Screen
                    name="FilterCircuit"
                    component={FilterCircuitScreen}
                  />
                  <Stack.Screen
                    name="SendBoulder"
                    component={SendBoulderScreen}
                  />
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
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                  />
                  <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditionsScreen}
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
