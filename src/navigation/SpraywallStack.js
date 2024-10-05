import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditSpraywallScreen,
  EditSpraywallNameScreen,
  EditSpraywallImageScreen,
  AddNewSprayWallScreen,
} from "../screens/spraywall";

const Stack = createNativeStackNavigator();

const SpraywallStack = () => (
  <Stack.Navigator initialRouteName="AddNewSprayWall">
    <Stack.Group>
      <Stack.Screen name="AddNewSprayWall" component={AddNewSprayWallScreen} />
      <Stack.Screen name="EditSpraywall" component={EditSpraywallScreen} />
      <Stack.Screen
        name="EditSpraywallName"
        component={EditSpraywallNameScreen}
      />
      <Stack.Screen
        name="EditSpraywallImage"
        component={EditSpraywallImageScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default SpraywallStack;
