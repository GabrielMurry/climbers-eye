import { View, Text } from "react-native";
import React from "react";

const Notes = ({ boulder }) => {
  return (
    <>
      {/* Matching */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>
          {boulder.matching ? "Matching" : "No Matching"}
        </Text>
      </View>
      {/* Feet Follow Hands */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>
          {boulder.feetFollowHands ? "Feet Follow Hands" : "Feet Anywhere"}
        </Text>
      </View>
      {/* Kickboard On */}
      {boulder.kickboardOn ? (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: "gray" }}>All Kickboard Footholds Allowed</Text>
        </View>
      ) : null}
      {/* Description */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>{boulder.description}</Text>
      </View>
      {/* Tags */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>#crimps #pinch #endurance</Text>
      </View>
      {/* date */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>{boulder.date}</Text>
      </View>
    </>
  );
};

export default Notes;
