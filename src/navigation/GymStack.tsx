import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditGymAddressScreen,
  EditGymNameScreen,
  EditGymScreen,
  EditGymTypeScreen,
} from "../screens/gym";
import GymScreen from "../screens/gym/GymScreen";

export type GymStackParamsList = {
  EditGym: undefined;
  EditGymType: undefined;
  EditGymName: undefined;
  EditGymAddress: undefined;
  Gym: undefined;
};

const GymStack = createNativeStackNavigator<GymStackParamsList>();

const GymNavigator = () => (
  <GymStack.Navigator
    initialRouteName="Gym"
    screenOptions={{ headerShown: false }}
  >
    <GymStack.Screen name="Gym" component={GymScreen} />
    <GymStack.Screen name="EditGym" component={EditGymScreen} />
    <GymStack.Screen name="EditGymType" component={EditGymTypeScreen} />
    <GymStack.Screen name="EditGymName" component={EditGymNameScreen} />
    <GymStack.Screen name="EditGymAddress" component={EditGymAddressScreen} />
  </GymStack.Navigator>
);

export default GymNavigator;
