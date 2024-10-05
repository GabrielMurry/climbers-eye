import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddNewCircuitScreen,
  CircuitScreen,
  FilterCircuitScreen,
} from "../screens/circuit";

const Stack = createNativeStackNavigator();

const CircuitStack = () => (
  <Stack.Navigator initialRouteName="Circuit">
    <Stack.Group>
      <Stack.Screen name="FilterCircuit" component={FilterCircuitScreen} />
      <Stack.Screen name="Circuit" component={CircuitScreen} />
      <Stack.Screen name="AddNewCircuit" component={AddNewCircuitScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default CircuitStack;
