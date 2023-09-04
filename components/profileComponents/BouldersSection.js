import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
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
      case "Statistics":
        return <ChartPieIcon color={"black"} size={20} />;
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Boulders and Statistics
          </Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          {bouldersSectionQuickData.map((boulderSection, index) => (
            <TouchableOpacity
              key={boulderSection.title}
              style={{
                borderBottomWidth:
                  index === bouldersSectionQuickData.length - 1 ? 0 : 1,
                borderColor: "lightgray",
                height: 60,
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("ProfileSection", {
                  section: boulderSection.title,
                })
              }
            >
              <View style={{ width: 30 }}>
                {iconFocused(boulderSection.title)}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>{boulderSection.title}</Text>
              </View>
              <View
                style={{
                  width: 75,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>{boulderSection.data}</Text>
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
          ))}
        </View>
      </View>
    </View>
  );
};

export default BouldersSection;
