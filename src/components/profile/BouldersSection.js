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
import { useNavigationContext } from "../../contexts/NavigationContext";

const BouldersSection = ({ navigation }) => {
  const { stackName } = useNavigationContext();

  const { user } = useSelector((state) => state.user);

  return (
    <View
      contentContainerStyle={{
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
            navigate={() =>
              navigation.navigate(stackName, { screen: "Logbook" })
            }
          />
          <SectionCard
            icon={<HeartIcon color={"black"} size={20} />}
            title={"Likes"}
            data={user.likesCount}
            navigate={() => navigation.navigate(stackName, { screen: "Likes" })}
          />
          <SectionCard
            icon={<BookmarkIcon color={"black"} size={20} />}
            title={"Bookmarks"}
            data={user.bookmarksCount}
            navigate={() =>
              navigation.navigate(stackName, { screen: "Bookmarks" })
            }
          />
          <SectionCard
            icon={<PencilIcon color={"black"} size={20} />}
            title={"Creations"}
            data={user.creationsCount}
            navigate={() =>
              navigation.navigate(stackName, { screen: "Creations" })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
