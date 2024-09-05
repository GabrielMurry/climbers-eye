import BoulderScreen from "../screens/boulder/BoulderScreen";
import HomeScreen from "../screens/home/HomeScreen";
import {
  UserIcon,
  MapPinIcon,
  HomeIcon,
  Square3Stack3DIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  UserIcon as UserIconSolid,
  MapPinIcon as MapPinIconSolid,
  HomeIcon as HomeIconSolid,
  Square3Stack3DIcon as Square3Stack3DIconSolid,
} from "react-native-heroicons/solid";
import MapScreen from "../screens/map/MapScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import AddBoulderModal from "../components/general/AddBoulderModal";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileBoulderSectionScreen from "../screens/profile/section/ProfileBoulderSectionScreen";
import ProfileStatsSectionScreen from "../screens/profile/section/ProfileStatsSectionScreen";
import { colors } from "../utils/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Boulder-Home" component={BoulderScreen} />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileUser" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileBoulderSection"
        component={ProfileBoulderSectionScreen}
      />
      <Stack.Screen
        name="ProfileStatsSection"
        component={ProfileStatsSectionScreen}
      />
      <Stack.Screen name="Boulder-Profile" component={BoulderScreen} />
    </Stack.Navigator>
  );
}

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
          tabBarIcon: ({ size, focused }) => {
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
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.primaryLight,
                    padding: 8,
                  }}
                >
                  <PlusIcon size={size} color={colors.primary} />
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
          tabBarLabel: ({ focused }) => {
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
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
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
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
          }}
        />
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

export default Tabs;
