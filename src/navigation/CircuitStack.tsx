import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateCircuitScreen, CircuitScreen } from "../screens/circuit";
import { Boulder } from "../utils/types/boulder";

export type CircuitStackParamList = {
  Circuit: { boulder: Boulder };
  CreateCircuit: undefined;
};

const Stack = createNativeStackNavigator<CircuitStackParamList>();

const CircuitNavigator = () => (
  <Stack.Navigator
    initialRouteName="Circuit"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Circuit" component={CircuitScreen} />
    <Stack.Screen name="CreateCircuit" component={CreateCircuitScreen} />
  </Stack.Navigator>
);

export default CircuitNavigator;
