import { View } from "react-native";
import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";

type HeaderProps = {
  leftIcon?: React.JSX.Element;
  leftText?: string;
  centerText?: string;
  rightIcon?: React.JSX.Element;
};

const Header: React.FC<HeaderProps> = ({
  leftIcon,
  leftText,
  centerText,
  rightIcon,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <HeaderLeft leftIcon={leftIcon} leftText={leftText} />
      <HeaderCenter centerText={centerText} />
      <HeaderRight rightIcon={rightIcon} />
    </View>
  );
};

export default Header;
