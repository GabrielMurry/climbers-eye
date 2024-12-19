import { View, Text } from "react-native";
import React from "react";
import {
  BookmarkIcon,
  CheckIcon,
  HeartIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { selectUser } from "../../redux/features/user/userSelectors";

const BouldersSection = () => {
  const navigation = useNavigation();
  const { stackName } = useNavigationContext();

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
            data={user.logbookCount}
            onPress={() =>
              navigation.navigate(stackName, { screen: "Logbook" })
            }
          />
          <SectionCard
            icon={<HeartIcon color={"black"} size={20} />}
            title={"Likes"}
            data={user.likesCount}
            onPress={() => navigation.navigate(stackName, { screen: "Likes" })}
          />
          <SectionCard
            icon={<BookmarkIcon color={"black"} size={20} />}
            title={"Bookmarks"}
            data={user.bookmarksCount}
            onPress={() =>
              navigation.navigate(stackName, { screen: "Bookmarks" })
            }
          />
          <SectionCard
            icon={<PencilIcon color={"black"} size={20} />}
            title={"Creations"}
            data={user.creationsCount}
            onPress={() =>
              navigation.navigate(stackName, { screen: "Creations" })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
