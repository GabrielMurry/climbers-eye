import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditSpraywallScreen,
  EditSpraywallNameScreen,
  EditSpraywallImageScreen,
  CreateSpraywallScreen,
} from "../screens/spraywall";
import { Spraywall } from "../utils/types/spraywall";

export type SpraywallStackParamList = {
  CreateSpraywall: undefined;
  EditSpraywall: { spraywall: Spraywall };
  EditSpraywallName: { spraywall: Spraywall };
  EditSpraywallImage: { spraywall: Spraywall };
};

const SpraywallStack = createNativeStackNavigator<SpraywallStackParamList>();

const SpraywallNavigator = () => (
  <SpraywallStack.Navigator
    initialRouteName="CreateSpraywall"
    screenOptions={{ headerShown: false }}
  >
    <SpraywallStack.Screen
      name="CreateSpraywall"
      component={CreateSpraywallScreen}
    />
    <SpraywallStack.Screen
      name="EditSpraywall"
      component={EditSpraywallScreen}
    />
    <SpraywallStack.Screen
      name="EditSpraywallName"
      component={EditSpraywallNameScreen}
    />
    <SpraywallStack.Screen
      name="EditSpraywallImage"
      component={EditSpraywallImageScreen}
    />
  </SpraywallStack.Navigator>
);

export default SpraywallNavigator;
