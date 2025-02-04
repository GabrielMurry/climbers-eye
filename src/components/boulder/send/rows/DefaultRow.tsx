import { View, Text } from "react-native";
import React from "react";

type DefaultRowProps = {
  label: string;
  value: string | number;
};

const DefaultRow: React.FC<DefaultRowProps> = ({ label, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text
        style={{
          flex: 1,
          fontWeight: "bold",
          marginRight: 10,
          fontSize: 16,
          color: "#333",
        }}
      >
        {label}:
      </Text>
      <Text
        style={{
          flexDirection: "row",
          flex: 2,
          fontSize: 16,
          color: "#555",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default DefaultRow;
