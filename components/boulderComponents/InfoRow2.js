import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLongRightIcon, CheckIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";

const InfoRow2 = ({ boulder, navigation }) => {
  const handleBoulderStatsPressed = () => {
    navigation.navigate("BoulderStats", { boulder: boulder });
  };

  const handleSentBoulderPressed = () => {
    navigation.navigate("Send", { boulder: boulder });
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
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handleBoulderStatsPressed}
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
            ? "green"
            : "rgba(235, 235, 235, 255)",
        }}
        onPress={handleSentBoulderPressed}
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
