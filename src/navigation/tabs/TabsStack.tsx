import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcons from "./TabIcons";
import TabLabels from "./TabLabels";
import ProfileStack, { ProfileStackParamList } from "../ProfileStack";
import HomeStack, { HomeStackParamsList } from "../HomeStack";
import CustomModal from "../../screens/modal/ModalScreen";
import { MapScreen } from "../../screens/map";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { MapStackParamList } from "../MapStack";
import { RootNavigationProp } from "../types/navigation";
import { View } from "react-native";

export type TabsStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamsList>;
  MapStack: NavigatorScreenParams<MapStackParamList>;
  AddBoulder: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

const TabStack = createBottomTabNavigator<TabsStackParamList>();

function TabNavigator() {
  const navigation = useNavigation();

  const Placeholder = () => <View></View>;

  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarIcon: ({ size, focused }) => {
          return TabIcons({ name: route.name, size, focused });
        },
        tabBarLabel: ({ focused }) => TabLabels({ name: route.name, focused }),
      })}
    >
      <TabStack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <TabStack.Screen
        name="MapStack"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <TabStack.Screen
        name="AddBoulder"
        component={Placeholder}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default tab behavior
            navigation.navigate("Modal");
          },
        })}
      />
      <TabStack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </TabStack.Navigator>
  );
}

export default TabNavigator;
