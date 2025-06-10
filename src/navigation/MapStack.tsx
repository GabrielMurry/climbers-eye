import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../screens/map";
import { CreateGymScreen } from "../screens/gym";

export type MapStackParamList = {
  Map: undefined;
  CreateGym: undefined;
};

const MapStack = createNativeStackNavigator<MapStackParamList>();

const MapNavigator = () => (
  <MapStack.Navigator
    initialRouteName="Map"
    screenOptions={{ headerShown: false }}
  >
    <MapStack.Screen name="Map" component={MapScreen} />
    <MapStack.Screen name="CreateGym" component={CreateGymScreen} />
  </MapStack.Navigator>
);

export default MapNavigator;
