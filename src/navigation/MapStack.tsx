import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../screens/map";

export type MapStackParamList = {
  Map: undefined;
};

const MapStack = createNativeStackNavigator<MapStackParamList>();

const MapNavigator = () => (
  <MapStack.Navigator initialRouteName="Map">
    <MapStack.Group>
      <MapStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </MapStack.Group>
  </MapStack.Navigator>
);

export default MapNavigator;
