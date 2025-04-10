import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProfileScreen,
  CropImageScreen,
  EditNameScreen,
  EditProfileScreen,
} from "../screens/profile";
import LogbookScreen from "../screens/profile/LogbookScreen";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider, StackName } from "../contexts/NavigationContext";
import BookmarksScreen from "../screens/profile/BookmarksScreen";
import LikesScreen from "../screens/profile/LikesScreen";
import CreationsScreen from "../screens/profile/CreationsScreen";
import { Boulder } from "../utils/types/boulder";

export type ProfileStackParamList = {
  ProfileUser: undefined;
  EditProfile: undefined;
  EditName: undefined;
  CropImage: {
    imageUri: string;
    width: number;
    height: number;
    isPortrait: boolean;
  };
  Boulder: { boulder: Boulder };
  Logbook: undefined;
  Bookmarks: undefined;
  Likes: undefined;
  Creations: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <NavigationProvider value={StackName.ProfileStack}>
      <ProfileStack.Navigator
        initialRouteName="ProfileUser"
        screenOptions={{ headerShown: false }}
      >
        <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
        <ProfileStack.Screen name="EditName" component={EditNameScreen} />
        <ProfileStack.Screen name="CropImage" component={CropImageScreen} />
        <ProfileStack.Screen
          name="ProfileUser"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen name="Boulder" component={BoulderScreen} />
        <ProfileStack.Screen name="Logbook" component={LogbookScreen} />
        <ProfileStack.Screen name="Bookmarks" component={BookmarksScreen} />
        <ProfileStack.Screen name="Likes" component={LikesScreen} />
        <ProfileStack.Screen name="Creations" component={CreationsScreen} />
      </ProfileStack.Navigator>
    </NavigationProvider>
  );
};

export default ProfileNavigator;
