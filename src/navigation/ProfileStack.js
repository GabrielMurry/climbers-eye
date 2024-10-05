import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProfileScreen,
  CropImageScreen,
  EditNameScreen,
  EditProfileScreen,
  ProfileBoulderSectionScreen,
  ProfileStatsSectionScreen,
  SwitchGymScreen,
} from "../screens/profile";
import LogbookScreen from "../screens/profile/LogbookScreen";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider } from "../contexts/NavigationContext";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const route = useRoute();
  return (
    <NavigationProvider value={{ stackName: route.name }}>
      <Stack.Navigator initialRouteName="ProfileUser">
        <Stack.Group>
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="EditName" component={EditNameScreen} />
          <Stack.Screen name="CropImage" component={CropImageScreen} />
          <Stack.Screen name="SwitchGym" component={SwitchGymScreen} />
          <Stack.Screen name="ProfileUser" component={ProfileScreen} />
          <Stack.Screen
            name="ProfileBoulderSection"
            component={ProfileBoulderSectionScreen}
          />
          <Stack.Screen
            name="ProfileStatsSection"
            component={ProfileStatsSectionScreen}
          />
          <Stack.Screen name="Logbook" component={LogbookScreen} />
          <Stack.Screen name="Boulder" component={BoulderScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationProvider>
  );
};

export default ProfileStack;
