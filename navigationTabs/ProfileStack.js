import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProfileBoulderSectionScreen from "../screens/profile/section/ProfileBoulderSectionScreen";
import ProfileStatsSectionScreen from "../screens/profile/section/ProfileStatsSectionScreen";
import BoulderScreen from "../screens/boulder/BoulderScreen";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileUser" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileBoulderSection"
        component={ProfileBoulderSectionScreen}
      />
      <Stack.Screen
        name="ProfileStatsSection"
        component={ProfileStatsSectionScreen}
      />
      <Stack.Screen name="Boulder-Profile" component={BoulderScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
