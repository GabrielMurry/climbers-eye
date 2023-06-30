import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BoulderScreen from "./screens/BoulderScreen";
import ListScreen from "./screens/ListScreen";
import {
  UserIcon,
  MapPinIcon,
  ArrowLeftCircleIcon,
} from "react-native-heroicons/outline";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddGymScreen from "./screens/AddGymScreen";
import AddBoulderScreen from "./screens/AddBoulderScreen";
import EditBoulderScreen from "./screens/EditBoulderScreen";
import CameraScreen from "./screens/CameraScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SubmitCodeScreen from "./screens/SubmitCodeScreen";
import { useEffect } from "react";
import fetchCsrfToken from "./api/configToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SendScreen from "./screens/SendScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import TestDrawScreen from "./screens/TestDrawScreen";
import FilterScreen from "./screens/FilterScreen";
import CircuitScreen from "./screens/CircuitScreen";
import BoulderStatsScreen from "./screens/BoulderStatsScreen";
import FilterCircuitScreen from "./screens/FilterCircuitScreen";
import CropImageScreen from "./screens/CropImageScreen";

const Stack = createNativeStackNavigator();

function customHeader(navigation, screenName) {
  let headerLeft = () => (
    <ArrowLeftCircleIcon
      size={30}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
  if (screenName === "Map") headerLeft = () => "";
  if (screenName === "Home") {
    headerLeft = () => (
      <MapPinIcon
        size={30}
        color="black"
        onPress={() => navigation.navigate("Map")}
      />
    );
  }
  if (screenName === "Boulder") {
    headerLeft = () => (
      <ArrowLeftCircleIcon
        size={30}
        color="black"
        onPress={() => navigation.navigate("List")}
      />
    );
  }
  let headerRight = () => (
    <UserIcon
      size={30}
      color="black"
      onPress={() => navigation.navigate("Profile")}
    />
  );

  let animation = "default";
  if (screenName === "Map" || screenName === "Camera") {
    animation = "none";
  }
  if (screenName === "Filter") {
    animation = "";
  }

  return {
    headerLeft,
    headerRight,
    title: "",
    headerShadowVisible: false,
    animation,
  };
}

export default function App() {
  // Retrieve csrf token from django on app mount and store token
  useEffect(() => {
    const fetchAndStoreCsrfToken = async () => {
      const csrfToken = await fetchCsrfToken();
      if (csrfToken) {
        await AsyncStorage.setItem("csrfToken", csrfToken);
        console.log("CSRF token stored:", csrfToken);
      }
    };

    fetchAndStoreCsrfToken();
  }, []);

  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <ActionSheetProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Screens */}
            {/* <Stack.Screen name="TestDraw" component={TestDrawScreen} /> */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                animation: "none",
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
              name="Signup"
              component={SignupScreen}
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
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={({ navigation }) => customHeader(navigation, "Map")}
            />
            <Stack.Screen
              name="AddGym"
              component={AddGymScreen}
              options={({ navigation }) => customHeader(navigation, "AddGym")}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={({ navigation }) => customHeader(navigation, "Camera")}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => customHeader(navigation, "Home")}
            />
            <Stack.Screen
              name="AddBoulder"
              component={AddBoulderScreen}
              options={({ navigation }) =>
                customHeader(navigation, "AddBoulder")
              }
            />
            <Stack.Screen
              name="EditBoulder"
              component={EditBoulderScreen}
              options={({ navigation }) =>
                customHeader(navigation, "EditBoulder")
              }
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CropImage"
              component={CropImageScreen}
              options={({ navigation }) =>
                customHeader(navigation, "CropImage")
              }
            />
            <Stack.Screen
              name="List"
              component={ListScreen}
              options={({ navigation }) => customHeader(navigation, "List")}
            />
            <Stack.Screen
              name="Filter"
              component={FilterScreen}
              options={({ navigation }) => customHeader(navigation, "Filter")}
            />
            <Stack.Screen
              name="FilterCircuit"
              component={FilterCircuitScreen}
              options={({ navigation }) =>
                customHeader(navigation, "FilterCircuit")
              }
            />
            <Stack.Screen
              name="Boulder"
              component={BoulderScreen}
              options={({ navigation }) => customHeader(navigation, "Boulder")}
            />
            <Stack.Screen
              name="Send"
              component={SendScreen}
              options={({ navigation }) => customHeader(navigation, "Send")}
            />
            <Stack.Screen
              name="Circuit"
              component={CircuitScreen}
              options={({ navigation }) => customHeader(navigation, "Circuit")}
            />
            <Stack.Screen
              name="BoulderStats"
              component={BoulderStatsScreen}
              options={({ navigation }) =>
                customHeader(navigation, "BoulderStats")
              }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ActionSheetProvider>
  );
}
