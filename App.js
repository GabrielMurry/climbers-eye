import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BoulderScreen from "./screens/BoulderScreen";
import ListScreen from "./screens/ListScreen";
import CustomHeader from "./components/CustomHeader";
import { UserIcon, MapPinIcon } from "react-native-heroicons/outline";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => <MapPinIcon size={25} color="black" />,
            headerRight: () => <UserIcon size={25} color="black" />,
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            headerLeft: () => <MapPinIcon size={25} color="black" />,
            headerRight: () => <UserIcon size={25} color="black" />,
            title: "",
            headerShadowVisible: false,
          }}
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
