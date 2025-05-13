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

export type BoulderStackParamList = {
  EditBoulder: { image: ImageObjUrl };
  PreviewEdit: {
    boulderImage: ImageObjUri;
    wallImage: ImageObjUri;
  };
  SendBoulder: { boulder: Boulder; userSendsData: UserSendsData[] };
  BoulderStats: { boulder: Boulder };
  BoulderUserSends: { userSendsData: UserSendsData[] };
};

const BoulderStack = createNativeStackNavigator<BoulderStackParamList>();

const BoulderNavigator = () => (
  <BoulderStack.Navigator screenOptions={{ headerShown: false }}>
    <BoulderStack.Screen name="EditBoulder" component={EditBoulderScreen} />
    <BoulderStack.Screen name="PreviewEdit" component={PreviewEditScreen} />
    <BoulderStack.Screen name="SendBoulder" component={SendBoulderScreen} />
    <BoulderStack.Screen name="BoulderStats" component={BoulderStatsScreen} />
    <BoulderStack.Screen
      name="BoulderUserSends"
      component={BoulderUserSendsScreen}
    />
  </BoulderStack.Navigator>
);

export default BoulderNavigator;
