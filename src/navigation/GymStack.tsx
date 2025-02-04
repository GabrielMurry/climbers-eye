import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CreateGymScreen,
  EditGymAddressScreen,
  EditGymNameScreen,
  EditGymScreen,
  EditGymTypeScreen,
} from "../screens/gym";

export type GymStackParamsList = {
  CreateGym: undefined;
  EditGym: undefined;
  EditGymType: undefined;
  EditGymName: undefined;
  EditGymAddress: undefined;
};

const GymStack = createNativeStackNavigator<GymStackParamsList>();

const GymNavigator = () => (
  <GymStack.Navigator
    initialRouteName="CreateGym"
    screenOptions={{ headerShown: false }}
  >
    <GymStack.Screen name="CreateGym" component={CreateGymScreen} />
    <GymStack.Screen name="EditGym" component={EditGymScreen} />
    <GymStack.Screen name="EditGymType" component={EditGymTypeScreen} />
    <GymStack.Screen name="EditGymName" component={EditGymNameScreen} />
    <GymStack.Screen name="EditGymAddress" component={EditGymAddressScreen} />
  </GymStack.Navigator>
);

export default GymNavigator;
