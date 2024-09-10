import {
  UserIcon,
  MapPinIcon,
  HomeIcon,
  Square3Stack3DIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  UserIcon as UserIconSolid,
  MapPinIcon as MapPinIconSolid,
  HomeIcon as HomeIconSolid,
  Square3Stack3DIcon as Square3Stack3DIconSolid,
} from "react-native-heroicons/solid";
import { View } from "react-native";
import { colors } from "../utils/styles";

const TabIcons = ({ route, size, focused }) => {
  let iconSource;

  switch (route.name) {
    case "Home":
      iconSource = focused ? (
        <HomeIconSolid size={size} color={"black"} />
      ) : (
        <HomeIcon size={size} color={"black"} />
      );
      break;
    case "Map":
      iconSource = focused ? (
        <MapPinIconSolid size={size} color={"black"} />
      ) : (
        <MapPinIcon size={size} color={"black"} />
      );
      break;
    case "AddBoulder":
      iconSource = (
        <View
          style={{
            borderRadius: 100,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            padding: 8,
          }}
        >
          <PlusIcon size={size} color={colors.primary} />
        </View>
      );
      break;
    case "Activity":
      iconSource = focused ? (
        <Square3Stack3DIconSolid size={size} color={"black"} />
      ) : (
        <Square3Stack3DIcon size={size} color={"black"} />
      );
      break;
    case "Profile":
      iconSource = focused ? (
        <UserIconSolid size={size} color={"black"} />
      ) : (
        <UserIcon size={size} color={"black"} />
      );
      break;
  }

  return iconSource;
};

export default TabIcons;
