import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProfileScreen,
  CropImageScreen,
  EditNameScreen,
  EditProfileScreen,
  SwitchGymScreen,
} from "../screens/profile";
import LogbookScreen from "../screens/profile/LogbookScreen";
import { BoulderScreen } from "../screens/boulder";
import { NavigationProvider } from "../contexts/NavigationContext";
import { useRoute } from "@react-navigation/native";
import BookmarksScreen from "../screens/profile/BookmarksScreen";
import LikesScreen from "../screens/profile/LikesScreen";
import CreationsScreen from "../screens/profile/CreationsScreen";

export type ProfileStackParamList = {
  ProfileUser: undefined;
  EditProfile: undefined;
  EditName: undefined;
  CropImage: undefined;
  SwitchGym: undefined;
  Boulder: { boulderId: number };
  Logbook: undefined;
  Bookmarks: undefined;
  Likes: undefined;
  Creations: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  const route = useRoute();
  return (
    <NavigationProvider value={{ stackName: route.name }}>
      <ProfileStack.Navigator initialRouteName="ProfileUser">
        <ProfileStack.Group>
          <ProfileStack.Screen
            name="EditProfile"
            component={EditProfileScreen}
          />
          <ProfileStack.Screen name="EditName" component={EditNameScreen} />
          <ProfileStack.Screen name="CropImage" component={CropImageScreen} />
          <ProfileStack.Screen name="SwitchGym" component={SwitchGymScreen} />
          <ProfileStack.Screen name="ProfileUser" component={ProfileScreen} />
          <ProfileStack.Screen name="Boulder" component={BoulderScreen} />
          <ProfileStack.Screen name="Logbook" component={LogbookScreen} />
          <ProfileStack.Screen name="Bookmarks" component={BookmarksScreen} />
          <ProfileStack.Screen name="Likes" component={LikesScreen} />
          <ProfileStack.Screen name="Creations" component={CreationsScreen} />
        </ProfileStack.Group>
      </ProfileStack.Navigator>
    </NavigationProvider>
  );
};

export default ProfileNavigator;
