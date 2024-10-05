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

const Stack = createNativeStackNavigator();

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
