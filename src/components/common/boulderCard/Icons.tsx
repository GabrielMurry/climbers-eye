import { View, Text } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { Boulder } from "../../../utils/types/boulder";

type IconsProps = {
  size: number;
  boulder: Boulder;
};

const Icons: React.FC<IconsProps> = ({ size, boulder }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
      }}
    >
      <CheckIcon size={size} color={boulder.isSent ? "green" : "lightgray"} />
      <FontAwesome
        name="heart"
        size={size}
        color={boulder.isLiked ? "red" : "lightgray"}
      />
      <FontAwesome
        name="bookmark"
        size={size}
        color={boulder.isBookmarked ? "gold" : "lightgray"}
      />
      <LinkIcon size={size} color={boulder.inCircuit ? "blue" : "lightgray"} />
    </View>
  );
};

export default Icons;
