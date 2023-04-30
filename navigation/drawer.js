import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { AddBoulderStack, HomeStack, MyStack } from "./stack";
import { Image, SafeAreaView, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: false, drawerPosition: "right" }}
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ flex: 1, paddingTop: 20, backgroundColor: "lightblue" }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 140,
              }}
            >
              <Image
                source={require("../assets/rockwall.jpg")}
                style={{ width: 100 }}
                resizeMode="contain"
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="AddBoulderStack"
        component={AddBoulderStack}
        options={{ title: "Add Boulder" }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
