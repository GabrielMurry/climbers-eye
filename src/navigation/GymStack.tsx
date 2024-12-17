import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddGymScreen,
  EditGymAddressScreen,
  EditGymNameScreen,
  EditGymScreen,
  EditGymTypeScreen,
} from "../screens/gym";

export type GymStackParamsList = {
  AddGym: undefined;
  EditGym: undefined;
  EditGymType: undefined;
  EditGymName: undefined;
  EditGymAddress: undefined;
};

const GymStack = createNativeStackNavigator<GymStackParamsList>();

const GymNavigator = () => (
  <GymStack.Navigator initialRouteName="AddGym">
    <GymStack.Group>
      <GymStack.Screen name="AddGym" component={AddGymScreen} />
      <GymStack.Screen name="EditGym" component={EditGymScreen} />
      <GymStack.Screen name="EditGymType" component={EditGymTypeScreen} />
      <GymStack.Screen name="EditGymName" component={EditGymNameScreen} />
      <GymStack.Screen name="EditGymAddress" component={EditGymAddressScreen} />
    </GymStack.Group>
  </GymStack.Navigator>
);

export default GymNavigator;
