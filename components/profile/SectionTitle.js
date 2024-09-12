import { View, Text } from "react-native";
import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,
        marginTop: 10,
        flexDirection: "row",
        height: 30,
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
