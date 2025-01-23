import { View, Text } from "react-native";
import React from "react";

type HeaderCenterProps = {
  centerText?: string;
};

const HeaderCenter: React.FC<HeaderCenterProps> = ({ centerText }) => {
  return (
    <View>
      <Text>{centerText}</Text>
    </View>
  );
};

export default HeaderCenter;
