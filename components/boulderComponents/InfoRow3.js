import { View, Text } from "react-native";
import React from "react";

const InfoRow3 = ({ boulder }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 50,
      }}
    >
      {/* Matching */}
      <Text style={{ color: "black" }}>
        {boulder.matching ? "Matching Allowed" : "No Matching"}
      </Text>
      <Text>|</Text>
      {/* Feet Follow Hands */}
      <Text style={{ color: "black" }}>
        {boulder.feetFollowHands ? "Feet Follow Hands" : "Feet Anywhere"}
      </Text>
      <Text>|</Text>
      {/* Kickboard On */}
      <Text
        style={{
          color: "black",
        }}
      >
        {boulder.kickboardOn ? "Kickboard On" : "Kickboard Off"}
      </Text>
    </View>
  );
};

export default InfoRow3;
