import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateCircuitScreen, CircuitScreen } from "../screens/circuit";
import { Boulder } from "../utils/types/boulder";
import CircuitBouldersListScreen from "../screens/circuit/CircuitBouldersListScreen";

export type CircuitStackParamList = {
  Circuit: { boulder: Boulder };
  CreateCircuit: undefined;
  CircuitBoulders: { circuitId: number };
};

const Stack = createNativeStackNavigator<CircuitStackParamList>();

const CircuitNavigator = () => (
  <Stack.Navigator
    initialRouteName="Circuit"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Circuit" component={CircuitScreen} />
    <Stack.Screen name="CreateCircuit" component={CreateCircuitScreen} />
    <Stack.Screen
      name="CircuitBoulders"
      component={CircuitBouldersListScreen}
    />
  </Stack.Navigator>
);

export default CircuitNavigator;
