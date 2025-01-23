import { View, Text } from "react-native";
import React from "react";

type HeaderLeftProps = {
  leftIcon?: React.JSX.Element;
  leftText?: string;
};

const HeaderLeft: React.FC<HeaderLeftProps> = ({ leftIcon, leftText }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {leftIcon}
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{leftText}</Text>
    </View>
  );
};

export default HeaderLeft;
