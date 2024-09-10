import MapScreen from "../screens/map/MapScreen";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import CustomModal from "../components/modal/CustomModal";
import ActivityScreen from "../screens/ActivityScreen";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import TabIcons from "./TabIcons";
import TabLabels from "./TabLabels";

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
          tabBarIcon: ({ size, focused }) => TabIcons({ route, size, focused }),
          tabBarLabel: ({ focused }) => TabLabels({ route, focused }),
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
      <CustomModal
        isVisible={modalVisible}
        onClose={toggleModal}
        navigation={navigation}
      />
    </>
  );
}

export default Tabs;
