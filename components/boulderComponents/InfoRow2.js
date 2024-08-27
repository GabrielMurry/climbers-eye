import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utils/styles";

const InfoRow2 = ({ boulder, chartData, userSendsData, navigation }) => {
  console.log(boulder);
  const handleBoulderStatsPress = () => {
    navigation.navigate("BoulderStats", { boulder, chartData });
  };

  const handleSentBoulderPress = () => {
    navigation.navigate("Send", { boulder, userSendsData });
  };

  const handleUserSendsCountPress = () => {
    navigation.navigate("BoulderUserSends", { boulder, userSendsData });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        height: 50,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          onPress={handleBoulderStatsPress}
          style={{
            width: 50,
            height: 35,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(235, 235, 235, 255)",
          }}
        >
          <FontAwesome name="book" size={24} color="black" />
        </TouchableOpacity>
        {boulder?.userSendsCount > 0 ? (
          <TouchableOpacity
            onPress={handleUserSendsCountPress}
            style={{
              width: 50,
              height: 35,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(235, 235, 235, 255)",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {boulder?.userSendsCount}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          flex: 0.6,
          justifyContent: "space-evenly",
          height: 35,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: boulder.isSent
            ? colors.primary
            : "rgba(235, 235, 235, 255)",
        }}
        onPress={handleSentBoulderPress}
      >
        <Text
          style={{
            color: boulder.isSent ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {boulder.isSent ? "Repeat" : "Log Send"}
        </Text>
        <ArrowLongRightIcon
          size={25}
          color={boulder.isSent ? "white" : "black"}
        />
        {/* User's number of repeats */}
        {/* <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: "green", // Set your circle color
            borderRadius: 10, // Set half of the width/height to make it a circle
            position: "absolute",
            top: 0,
            right: 0,
            transform: [{ translateX: 10 }, { translateY: -10 }], // Center the circle (half the width or height)
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>1</Text>
        </View> */}
      </TouchableOpacity>
    </View>
  );
};

export default InfoRow2;
