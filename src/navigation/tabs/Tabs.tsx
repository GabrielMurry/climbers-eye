import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import TabIcons from "./TabIcons";
import TabLabels from "./TabLabels";
import ProfileStack from "../ProfileStack";
import HomeStack, { HomeStackParamsList } from "../HomeStack";
import MapStack from "../MapStack";
import CustomModal from "../../components/modal/CustomModal";
import { MapScreen } from "../../screens/map";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabsStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamsList>;
  MapStack: undefined;
  AddBoulder: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<TabsStackParamList>();

function Tabs() {
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
            console.log(route);
            return TabIcons({ name: route.name, size, focused });
          },
          tabBarLabel: ({ focused }) =>
            TabLabels({ name: route.name, focused }),
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MapStack"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddBoulder"
          component={ModalTabScreen}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault(); // Prevent default tab behavior
              toggleModal(); // Show the modal
            },
          })}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
      {/* Render the modal */}
      <CustomModal isVisible={modalVisible} onClose={toggleModal} />
    </>
  );
}

export default Tabs;
