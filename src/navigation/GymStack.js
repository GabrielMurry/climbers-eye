import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddGymScreen,
  EditGymAddressScreen,
  EditGymNameScreen,
  EditGymScreen,
  EditGymTypeScreen,
} from "../screens/gym";

const GymStackNav = createNativeStackNavigator();

const GymStack = () => (
  <GymStackNav.Navigator initialRouteName="AddGym">
    <GymStackNav.Group>
      <GymStackNav.Screen name="AddGym" component={AddGymScreen} />
      <GymStackNav.Screen name="EditGym" component={EditGymScreen} />
      <GymStackNav.Screen name="EditGymType" component={EditGymTypeScreen} />
      <GymStackNav.Screen name="EditGymName" component={EditGymNameScreen} />
      <GymStackNav.Screen
        name="EditGymAddress"
        component={EditGymAddressScreen}
      />
    </GymStackNav.Group>
  </GymStackNav.Navigator>
);

export default GymStack;
