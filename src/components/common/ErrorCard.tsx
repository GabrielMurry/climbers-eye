import { View, Text } from "react-native";
import React from "react";

type ErrorCardProps = {
  message: string;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => {
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

export default ErrorCard;
