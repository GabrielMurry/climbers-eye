import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../screens/map";

const Stack = createNativeStackNavigator();

const MapStack = () => (
  <Stack.Navigator initialRouteName="Map">
    <Stack.Group>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default MapStack;
