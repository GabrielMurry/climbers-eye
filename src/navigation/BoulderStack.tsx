import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BoulderScreen,
  BoulderStatsScreen,
  BoulderUserSendsScreen,
  EditBoulderScreen,
  PreviewEditScreen,
  ReportBoulderScreen,
  SendBoulderScreen,
} from "../screens/boulder";
import { UserSendsData } from "../screens/boulder/types";
import { ImageObjUri, ImageObjUrl } from "../utils/types/image";
import { Boulder } from "../utils/types/boulder";
import { ChartData } from "../screens/boulder/BoulderScreen";

export type BoulderStackParamList = {
  Boulder: { boulderId: number };
  EditBoulder: { image: ImageObjUrl };
  PreviewEdit: { image: ImageObjUri };
  SendBoulder: { boulder: Boulder; userSendsData: UserSendsData[] };
  BoulderStats: { boulder: Boulder; chartData: ChartData[] };
  ReportBoulder: undefined;
  BoulderUserSends: { userSendsData: UserSendsData[] };
};

const Stack = createNativeStackNavigator<BoulderStackParamList>();

const BoulderStack = () => (
  <Stack.Navigator initialRouteName="Boulder">
    <Stack.Group>
      <Stack.Screen name="Boulder" component={BoulderScreen} />
      <Stack.Screen name="EditBoulder" component={EditBoulderScreen} />
      <Stack.Screen name="PreviewEdit" component={PreviewEditScreen} />
      <Stack.Screen name="SendBoulder" component={SendBoulderScreen} />
      <Stack.Screen name="BoulderStats" component={BoulderStatsScreen} />
      <Stack.Screen name="ReportBoulder" component={ReportBoulderScreen} />
      <Stack.Screen
        name="BoulderUserSends"
        component={BoulderUserSendsScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default BoulderStack;
