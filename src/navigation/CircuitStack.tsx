import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateCircuitScreen, CircuitScreen } from "../screens/circuit";
import { Boulder } from "../utils/types/boulder";
import CircuitBouldersListScreen from "../screens/circuit/CircuitBouldersListScreen";

export type CircuitStackParamList = {
  Circuit: { boulder: Boulder };
  CreateCircuit: undefined;
  CircuitBoulders: { circuitId: number };
};

const CircuitStack = createNativeStackNavigator<CircuitStackParamList>();

const CircuitNavigator = () => (
  <CircuitStack.Navigator
    // initialRouteName="Circuit"
    screenOptions={{ headerShown: false }}
  >
    {/* <CircuitStack.Screen
      name="Circuit"
      component={CircuitScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    /> */}
    <CircuitStack.Screen
      name="CreateCircuit"
      component={CreateCircuitScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    />
    <CircuitStack.Screen
      name="CircuitBoulders"
      component={CircuitBouldersListScreen}
    />
  </CircuitStack.Navigator>
);

export default CircuitNavigator;
