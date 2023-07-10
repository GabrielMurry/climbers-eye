import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

const SettingsButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <ChevronRightIcon size={15} color={"black"} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
