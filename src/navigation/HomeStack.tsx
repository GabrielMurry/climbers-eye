import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FilterHomeListScreen, HomeScreen } from "../screens/home";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider, StackName } from "../contexts/NavigationContext";
import { Boulder } from "../utils/types/boulder";

export type HomeStackParamsList = {
  HomeList: undefined;
  FilterHomeList: undefined;
  Boulder: { boulder: Boulder };
};

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <NavigationProvider value={StackName.HomeStack}>
      <HomeStack.Navigator
        initialRouteName="HomeList"
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name="HomeList" component={HomeScreen} />
        <HomeStack.Screen
          name="FilterHomeList"
          component={FilterHomeListScreen}
        />
        <HomeStack.Screen name="Boulder" component={BoulderScreen} />
      </HomeStack.Navigator>
    </NavigationProvider>
  );
};

export default HomeNavigator;
