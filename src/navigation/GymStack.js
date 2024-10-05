import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddGymScreen,
  EditGymAddressScreen,
  EditGymNameScreen,
  EditGymScreen,
  EditGymTypeScreen,
} from "../screens/gym";

const Stack = createNativeStackNavigator();

const GymStack = () => (
  <Stack.Navigator initialRouteName="AddGym">
    <Stack.Group>
      <Stack.Screen name="AddGym" component={AddGymScreen} />
      <Stack.Screen name="EditGym" component={EditGymScreen} />
      <Stack.Screen name="EditGymType" component={EditGymTypeScreen} />
      <Stack.Screen name="EditGymName" component={EditGymNameScreen} />
      <Stack.Screen name="EditGymAddress" component={EditGymAddressScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default GymStack;
