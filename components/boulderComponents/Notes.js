import { View, Text } from "react-native";
import React from "react";

const Notes = ({ boulder }) => {
  return (
    <>
      {/* Description */}
      {boulder.description ? (
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: "black" }}>{boulder.description}</Text>
        </View>
      ) : null}
      {/* Tags */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "black" }}>#crimps #pinch #endurance</Text>
      </View>
      {/* date */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: "gray" }}>{boulder.date}</Text>
      </View>
    </>
  );
};

export default Notes;
