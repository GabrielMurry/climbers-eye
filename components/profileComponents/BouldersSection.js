import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import {
  BookmarkIcon,
  ChartPieIcon,
  CheckIcon,
  ChevronRightIcon,
  HeartIcon,
  PencilIcon,
  TrophyIcon,
} from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";

const BouldersSection = ({ bouldersSectionQuickData, navigation }) => {
  const iconFocused = (title) => {
    switch (title) {
      case "Logbook":
        return <CheckIcon color={"black"} size={20} />;
      case "Likes":
        return <HeartIcon color={"black"} size={20} />;
      case "Bookmarks":
        return <BookmarkIcon color={"black"} size={20} />;
      case "Creations":
        return <PencilIcon color={"black"} size={20} />;
    }
  };

  const renderBouldersSectionQuickData = () => {
    // must turn section quick data from an object to an array, but grab each entries' key and value
    return Object.entries(bouldersSectionQuickData).map(
      ([key, value], index, array) => (
        <TouchableOpacity
          key={key}
          style={{
            borderBottomWidth: index === array.length - 1 ? 0 : 1,
            borderColor: "lightgray",
            height: 60,
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("ProfileBoulderSection", {
              section: key,
            })
          }
        >
          <View style={{ width: 30 }}>{iconFocused(key)}</View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16 }}>{key}</Text>
          </View>
          <View
            style={{
              width: 75,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>{value}</Text>
          </View>
          <View
            style={{
              width: 50,
              alignItems: "center",
            }}
          >
            <ChevronRightIcon color={"black"} size={20} />
          </View>
        </TouchableOpacity>
      )
    );
  };

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
        <View
          style={{
            paddingHorizontal: 30,
            marginTop: 10,
            flexDirection: "row",
            height: 30,
            alignItems: "center",
          }}
        >
          {/* section title */}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Boulders</Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          {renderBouldersSectionQuickData()}
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
