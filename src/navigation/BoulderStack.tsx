import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BoulderScreen,
  BoulderStatsScreen,
  BoulderUserSendsScreen,
  EditBoulderScreen,
  PreviewEditScreen,
  SendBoulderScreen,
} from "../screens/boulder";
import { UserSendsData } from "../screens/boulder/types";
import { ImageObjUri, ImageObjUrl } from "../utils/types/image";
import { Boulder } from "../utils/types/boulder";
import { ChartData } from "../screens/boulder/BoulderScreen";
import BoulderImageFullScreen from "../screens/boulder/BoulderImageFullScreen";
import { CircuitScreen, CreateCircuitScreen } from "../screens/circuit";

export type BoulderStackParamList = {
  Boulder: { boulder: Boulder };
  EditBoulder: { image: ImageObjUrl };
  PreviewEdit: {
    boulderImage: ImageObjUri;
    wallImage: ImageObjUri;
  };
  SendBoulder: { boulder: Boulder; userSendsData: UserSendsData[] };
  BoulderStats: { boulder: Boulder };
  BoulderUserSends: { userSendsData: UserSendsData[] };
  AddBoulderToCircuit: { boulder: Boulder };
  CreateCircuit: undefined;
};

const BoulderStack = createNativeStackNavigator<BoulderStackParamList>();

const BoulderNavigator = () => (
  <BoulderStack.Navigator screenOptions={{ headerShown: false }}>
    <BoulderStack.Screen name="Boulder" component={BoulderScreen} />
    <BoulderStack.Screen name="EditBoulder" component={EditBoulderScreen} />
    <BoulderStack.Screen name="PreviewEdit" component={PreviewEditScreen} />
    <BoulderStack.Screen
      name="SendBoulder"
      component={SendBoulderScreen}
      options={{
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    />
    <BoulderStack.Screen
      name="BoulderStats"
      component={BoulderStatsScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    />
    <BoulderStack.Screen
      name="BoulderUserSends"
      component={BoulderUserSendsScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    />
    <BoulderStack.Screen
      name="AddBoulderToCircuit"
      component={CircuitScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    />
    <BoulderStack.Screen
      name="CreateCircuit"
      component={CreateCircuitScreen}
      options={{ presentation: "modal", animation: "slide_from_bottom" }}
    />
  </BoulderStack.Navigator>
);

export default BoulderNavigator;
