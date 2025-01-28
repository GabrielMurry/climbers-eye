import { View, Text, useWindowDimensions } from "react-native";
import React from "react";

type HeaderCenterProps = {
  centerText?: string;
};

const HeaderCenter: React.FC<HeaderCenterProps> = ({ centerText }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: useWindowDimensions().width,
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{centerText}</Text>
    </View>
  );
};

export default HeaderCenter;
