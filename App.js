import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoulderScreen from "./screens/BoulderScreen";
import ListScreen from "./screens/ListScreen";
import {
  UserIcon,
  MapPinIcon,
  HomeIcon,
  Square3Stack3DIcon,
  PlusIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import {
  UserIcon as UserIconSolid,
  MapPinIcon as MapPinIconSolid,
  HomeIcon as HomeIconSolid,
  Square3Stack3DIcon as Square3Stack3DIconSolid,
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
import { useEffect, useState } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import AddBoulderModal from "./components/general/AddBoulderModal";
import ActivityScreen from "./screens/ActivityScreen";
import EditProfileScreen from "./screens/profile/edit/EditProfileScreen";
import EditNameScreen from "./screens/profile/edit/EditNameScreen";
import { StatusBar } from "react-native";
import SwitchGymScreen from "./screens/profile/edit/SwitchGymScreen";
import AddNewCircuitScreen from "./screens/AddNewCircuitScreen";
import ProfileBoulderSectionScreen from "./screens/profile/section/ProfileBoulderSectionScreen";
import ProfileStatsSectionScreen from "./screens/profile/section/ProfileStatsSectionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from "./api/requestMethods";
import ReportBoulderScreen from "./screens/ReportBoulderScreen";
import BoulderUserSendsScreen from "./screens/BoulderUserSendsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const clearAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length > 0) {
        // If there are keys, clear AsyncStorage
        await AsyncStorage.clear();
        console.log("AsyncStorage cleared successfully.");
      } else {
        console.log("AsyncStorage is already empty.");
      }
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  const getTempCsrfToken = async () => {
    const response = await request("get", "temp_csrf_token/");
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
  };
  useEffect(() => {
    clearAsyncStorage();
    getTempCsrfToken();
  }, []);

  const Tab = createBottomTabNavigator();

  function Tabs({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    const ModalTabScreen = () => (
      <View>
        <Text>Modal Tab Screen</Text>
      </View>
    );

    return (
      <>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              borderTopWidth: 0,
            },
            tabBarIcon: ({ color, size, focused }) => {
              // Set the appropriate icon based on the route name and focused state
              let iconSource;
              if (route.name === "Home") {
                iconSource = focused ? (
                  <HomeIconSolid size={size} color={"black"} />
                ) : (
                  <HomeIcon size={size} color={"black"} />
                );
              } else if (route.name === "Map") {
                iconSource = focused ? (
                  <MapPinIconSolid size={size} color={"black"} />
                ) : (
                  <MapPinIcon size={size} color={"black"} />
                );
              } else if (route.name === "AddBoulder") {
                iconSource = (
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "black",
                      padding: 8,
                    }}
                  >
                    <PlusIcon size={size} color={"white"} />
                  </View>
                );
              } else if (route.name === "Activity") {
                iconSource = focused ? (
                  <Square3Stack3DIconSolid size={size} color={"black"} />
                ) : (
                  <Square3Stack3DIcon size={size} color={"black"} />
                );
              } else if (route.name === "Profile") {
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

              if (route.name === "AddBoulder") {
                return;
              }

              return (
                <Text style={{ color: labelColor, fontSize: 10 }}>
                  {route.name}
                </Text>
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={ListScreen} />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="AddBoulder"
            component={ModalTabScreen}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault(); // Prevent default tab behavior
                toggleModal(); // Show the modal
              },
            })}
          />
          <Tab.Screen name="Activity" component={ActivityScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        {/* Render the modal */}
        <AddBoulderModal
          isVisible={modalVisible}
          onClose={toggleModal}
          navigation={navigation}
        />
      </>
    );
  }

  return (
    // ReactNativeActionSheet uses React context to allow your components to invoke the menu
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
            <Stack.Screen
              name="ProfileBoulderSection"
              component={ProfileBoulderSectionScreen}
            />
            <Stack.Screen
              name="ProfileStatsSection"
              component={ProfileStatsSectionScreen}
            />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="EditName" component={EditNameScreen} />
            <Stack.Screen name="CropImage" component={CropImageScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen
              name="FilterCircuit"
              component={FilterCircuitScreen}
            />
            <Stack.Screen name="Boulder" component={BoulderScreen} />
            <Stack.Screen name="Send" component={SendScreen} />
            <Stack.Screen name="Circuit" component={CircuitScreen} />
            <Stack.Screen
              name="AddNewCircuit"
              component={AddNewCircuitScreen}
            />
            <Stack.Screen name="BoulderStats" component={BoulderStatsScreen} />
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
  );
}
