import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import AddSprayWallScreen from "./screens/AddSprayWallScreen";
import AddBoulderScreen from "./screens/AddBoulderScreen";
import EditBoulderScreen from "./screens/EditBoulderScreen";
import CameraScreen from "./screens/CameraScreen";
import TestDrawScreen from "./screens/TestDrawScreen";

const Stack = createNativeStackNavigator();

function customHeader(navigation, name) {
  let headerLeft = () => (
    <ArrowLeftCircleIcon
      size={30}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
  if (name === "Map") headerLeft = () => "";
  if (name === "Home") {
    headerLeft = () => (
      <MapPinIcon
        size={30}
        color="black"
        onPress={() => navigation.navigate("Map")}
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

  let animation = "true";
  if (name === "Map" || name === "Camera") {
    animation = "none";
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens */}
        <Stack.Screen name="TestDraw" component={TestDrawScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
          name="AddSprayWall"
          component={AddSprayWallScreen}
          options={({ navigation }) => customHeader(navigation, "AddSprayWall")}
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
          options={({ navigation }) => customHeader(navigation, "AddBoulder")}
        />
        <Stack.Screen
          name="EditBoulder"
          component={EditBoulderScreen}
          options={({ navigation }) => customHeader(navigation, "EditBoulder")}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={({ navigation }) => customHeader(navigation, "List")}
        />
        <Stack.Screen name="Boulder" component={BoulderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
