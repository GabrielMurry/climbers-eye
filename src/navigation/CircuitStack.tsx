import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddNewCircuitScreen,
  CircuitScreen,
  FilterCircuitScreen,
} from "../screens/circuit";
import { Boulder } from "../utils/types/boulder";

export type CircuitStackParamList = {
  Circuit: { boulder: Boulder };
  FilterCircuit: undefined;
  AddNewCircuit: undefined;
};

const Stack = createNativeStackNavigator<CircuitStackParamList>();

const CircuitNavigator = () => (
  <Stack.Navigator initialRouteName="Circuit">
    <Stack.Group>
      <Stack.Screen name="FilterCircuit" component={FilterCircuitScreen} />
      <Stack.Screen name="Circuit" component={CircuitScreen} />
      <Stack.Screen name="AddNewCircuit" component={AddNewCircuitScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default CircuitNavigator;
