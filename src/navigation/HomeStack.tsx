import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FilterHomeListScreen, HomeScreen } from "../screens/home";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider, StackName } from "../contexts/NavigationContext";

export type HomeStackParamsList = {
  HomeList: undefined;
  FilterHomeList: undefined;
  Boulder: { boulderId: number };
};

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

const HomeNavigator = () => {
  return (
    <NavigationProvider value={StackName.HomeStack}>
      <HomeStack.Navigator initialRouteName="HomeList">
        <HomeStack.Group>
          <HomeStack.Screen
            name="HomeList"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <HomeStack.Screen
            name="FilterHomeList"
            component={FilterHomeListScreen}
          />
          <HomeStack.Screen name="Boulder" component={BoulderScreen} />
        </HomeStack.Group>
      </HomeStack.Navigator>
    </NavigationProvider>
  );
};

export default HomeNavigator;
