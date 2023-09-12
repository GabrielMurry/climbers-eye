import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  BoltIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  TrophyIcon,
} from "react-native-heroicons/outline";

const StatsSection = ({ statsSectionQuickData, navigation }) => {
  const iconFocused = (title) => {
    switch (title) {
      case "Top Grade":
        return <TrophyIcon color={"black"} size={20} />;
      case "Flashes":
        return <BoltIcon color={"black"} size={20} />;
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Statistics</Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          {statsSectionQuickData.map((section, index) => (
            <TouchableOpacity
              key={section.title}
              style={{
                borderBottomWidth:
                  index === statsSectionQuickData.length - 1 ? 0 : 1,
                borderColor: "lightgray",
                height: 60,
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("ProfileStatsSection", {
                  section: section.title,
                })
              }
            >
              <View style={{ width: 30 }}>{iconFocused(section.title)}</View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>{section.title}</Text>
              </View>
              <View
                style={{
                  width: 75,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>{section.data}</Text>
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

export default StatsSection;
