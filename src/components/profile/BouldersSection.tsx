import { View } from "react-native";
import React from "react";
import {
  BookmarkIcon,
  CheckIcon,
  HeartIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { selectUser } from "../../redux/features/user/userSelectors";

const BouldersSection = () => {
  const navigation = useNavigation();

  // const profileStack = useNavigationContext();

  const user = useAppSelector((state) => selectUser(state));

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
      }}
    >
      <SectionTitle title={"Boulders"} />
      <View style={{ paddingLeft: 30 }}>
        <SectionCard
          icon={<CheckIcon color={"black"} size={20} />}
          title={"Logbook"}
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Logbook" })
          }
        />
        <SectionCard
          icon={<HeartIcon color={"black"} size={20} />}
          title={"Likes"}
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Likes" })
          }
        />
        <SectionCard
          icon={<BookmarkIcon color={"black"} size={20} />}
          title={"Bookmarks"}
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Bookmarks" })
          }
        />
        <SectionCard
          icon={<PencilIcon color={"black"} size={20} />}
          title={"Creations"}
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Creations" })
          }
        />
      </View>
    </View>
  );
};

export default BouldersSection;
