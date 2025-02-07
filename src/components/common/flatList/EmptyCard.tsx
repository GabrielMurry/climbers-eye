import { View, Text } from "react-native";
import React from "react";

type EmptyCardProps = {
  message: string;
};

const EmptyCard: React.FC<EmptyCardProps> = ({ message }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{message}</Text>
    </View>
  );
};

export default EmptyCard;
