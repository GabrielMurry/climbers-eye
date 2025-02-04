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
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ backgroundColor: "lightgray", height: 3 }} />
        <SectionTitle title={"Boulders"} />
        <View style={{ paddingLeft: 30 }}>
          <SectionCard
            icon={<CheckIcon color={"black"} size={20} />}
            title={"Logbook"}
            data={0}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "Logbook" })
            }
          />
          <SectionCard
            icon={<HeartIcon color={"black"} size={20} />}
            title={"Likes"}
            data={0}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "Likes" })
            }
          />
          <SectionCard
            icon={<BookmarkIcon color={"black"} size={20} />}
            title={"Bookmarks"}
            data={0}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "Bookmarks" })
            }
          />
          <SectionCard
            icon={<PencilIcon color={"black"} size={20} />}
            title={"Creations"}
            data={0}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "Creations" })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
