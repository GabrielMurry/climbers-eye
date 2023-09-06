import { View, Text } from "react-native";
import React from "react";

const InfoRow6 = ({ boulder }) => {
  return (
    <View
      style={{
        height: 50,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "gray" }}>{boulder.date}</Text>
    </View>
  );
};

export default InfoRow6;
