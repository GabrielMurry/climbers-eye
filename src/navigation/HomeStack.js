import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FilterHomeListScreen, HomeScreen } from "../screens/home";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider } from "../contexts/NavigationContext";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const route = useRoute();
  return (
    <NavigationProvider value={{ stackName: route.name }}>
      <Stack.Navigator initialRouteName="HomeList">
        <Stack.Group>
          <Stack.Screen
            name="HomeList"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FilterHomeList"
            component={FilterHomeListScreen}
          />
          <Stack.Screen name="Boulder" component={BoulderScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationProvider>
  );
};

export default HomeStack;
