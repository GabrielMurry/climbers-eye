import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FilterHomeListScreen, HomeScreen } from "../screens/home";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider, StackName } from "../contexts/NavigationContext";
import { Boulder } from "../utils/types/boulder";
import { selectGym } from "../redux/features/gym/gymSelectors";
import { useAppSelector } from "../redux/hooks";
import { selectFilters } from "../redux/features/filter/filterSelectors";
import { useState } from "react";
import { Pressable } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

export type HomeStackParamsList = {
  HomeList: undefined;
  FilterHomeList: undefined;
  Boulder: { boulder: Boulder };
};

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  const gym = useAppSelector((state) => selectGym(state));

  const [show, setShow] = useState(false);

  return (
    <NavigationProvider value={StackName.HomeStack}>
      <HomeStack.Navigator
        initialRouteName="HomeList"
        // screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen
          name="HomeList"
          component={HomeScreen}
          // options={{
          //   headerTitle: gym.name,
          //   headerLargeTitle: true,
          //   headerShadowVisible: false,
          //   headerSearchBarOptions: {
          //     placeholder: "search",
          //     hideWhenScrolling: true,
          //   },
          // }}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="FilterHomeList"
          component={FilterHomeListScreen}
        />
        <HomeStack.Screen
          name="Boulder"
          component={BoulderScreen}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </NavigationProvider>
  );
};

export default HomeNavigator;
