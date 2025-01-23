import { View } from "react-native";
import React from "react";

type HeaderRightProps = {
  rightIcon?: React.JSX.Element;
};

const HeaderRight: React.FC<HeaderRightProps> = ({ rightIcon }) => {
  return <View>{rightIcon}</View>;
};

export default HeaderRight;
