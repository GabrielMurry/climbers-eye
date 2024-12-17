import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditSpraywallScreen,
  EditSpraywallNameScreen,
  EditSpraywallImageScreen,
  AddNewSprayWallScreen,
} from "../screens/spraywall";
import { ImageObjUrl } from "../utils/types/image";
import { Spraywall } from "../utils/types/spraywall";

export type SpraywallStackParamList = {
  AddNewSprayWall: { image: ImageObjUrl };
  EditSpraywall: { spraywall: Spraywall };
  EditSpraywallName: { spraywall: Spraywall };
  EditSpraywallImage: { spraywall: Spraywall };
};

const SpraywallStack = createNativeStackNavigator<SpraywallStackParamList>();

const SpraywallNavigator = () => (
  <SpraywallStack.Navigator initialRouteName="AddNewSprayWall">
    <SpraywallStack.Group>
      <SpraywallStack.Screen
        name="AddNewSprayWall"
        component={AddNewSprayWallScreen}
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
    </SpraywallStack.Group>
  </SpraywallStack.Navigator>
);

export default SpraywallNavigator;
