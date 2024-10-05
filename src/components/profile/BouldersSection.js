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

const BouldersSection = ({ navigation }) => {
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
            navigation={navigation}
          />
          <SectionCard
            icon={<HeartIcon color={"black"} size={20} />}
            title={"Likes"}
            data={user.likesCount}
          />
          <SectionCard
            icon={<BookmarkIcon color={"black"} size={20} />}
            title={"Bookmarks"}
            data={user.bookmarksCount}
          />
          <SectionCard
            icon={<PencilIcon color={"black"} size={20} />}
            title={"Creations"}
            data={user.creationsCount}
          />
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
