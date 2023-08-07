import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BoulderScreen from "./screens/BoulderScreen";
import ListScreen from "./screens/ListScreen";
import {
  UserIcon,
  MapPinIcon,
  ArrowLeftCircleIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import {
  UserIcon as UserIconSolid,
  MapPinIcon as MapPinIconSolid,
  HomeIcon as HomeIconSolid,
} from "react-native-heroicons/solid";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import AddGymScreen from "./screens/AddGymScreen";
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
import FilterScreen from "./screens/FilterScreen";
import CircuitScreen from "./screens/CircuitScreen";
import BoulderStatsScreen from "./screens/BoulderStatsScreen";
import FilterCircuitScreen from "./screens/FilterCircuitScreen";
import CropImageScreen from "./screens/CropImageScreen";
import EditGymScreen from "./screens/EditGymScreen";
import AddNewSprayWallScreen from "./screens/AddNewSprayWallScreen";
import EditSprayWallScreen from "./screens/EditSprayWallScreen";
import EditScreen from "./screens/EditScreen";
import ProfileSectionScreen from "./screens/profile/section/ProfileSectionScreen";
import SettingsScreen from "./screens/profile/edit/SettingsScreen";
import BannerScreen from "./screens/profile/edit/BannerScreen";
import HeadshotScreen from "./screens/profile/edit/HeadshotScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

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

  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            // Set the appropriate icon based on the route name and focused state
            let iconSource;
            if (route.name === "ListTab") {
              iconSource = focused ? (
                <HomeIconSolid size={size} color={"black"} />
              ) : (
                <HomeIcon size={size} color={"black"} />
              );
            } else if (route.name === "MapTab") {
              iconSource = focused ? (
                <MapPinIconSolid size={size} color={"black"} />
              ) : (
                <MapPinIcon size={size} color={"black"} />
              );
            } else if (route.name === "ProfileTab") {
              iconSource = focused ? (
                <UserIconSolid size={size} color={"black"} />
              ) : (
                <UserIcon size={size} color={"black"} />
              );
            }

            return iconSource;
          },
          tabBarLabel: ({ focused, color }) => {
            // Set the label text and style based on the focused state
            const labelColor = focused
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.5)"; // Change these colors as desired

            return (
              <Text style={{ color: labelColor, fontSize: 10 }}>
                {route.name}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name="ListTab" component={ListScreen} />
        <Tab.Screen name="MapTab" component={MapScreen} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
    <ActionSheetProvider>
      <Provider store={store}>
        <NavigationContainer>
          {/* Preload the images before rendering any screen */}
          <Stack.Navigator>
            {/* Screens */}
            {/* <Stack.Screen
              name="TestImage"
              component={TestImageScreen}
              options={{
                headerShown: false,
                animation: "none",
              }}
            /> */}
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
              name="EditGym"
              component={EditGymScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Edit"
              component={EditScreen}
              options={({ navigation }) => customHeader(navigation, "Edit")}
            />
            <Stack.Screen
              name="AddNewSprayWall"
              component={AddNewSprayWallScreen}
              options={({ navigation }) =>
                customHeader(navigation, "AddNewSprayWall")
              }
            />
            <Stack.Screen
              name="EditSprayWall"
              component={EditSprayWallScreen}
              options={({ navigation }) =>
                customHeader(navigation, "EditSprayWall")
              }
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={({ navigation }) => customHeader(navigation, "Camera")}
            />
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
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
              name="ProfileSection"
              component={ProfileSectionScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Banner"
              component={BannerScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Headshot"
              component={HeadshotScreen}
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
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Filter"
              component={FilterScreen}
              options={{ headerShown: false }}
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
