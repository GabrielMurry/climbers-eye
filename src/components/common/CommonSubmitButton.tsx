import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type CommonSubmitButtonProps = {
  onPress: () => void;
  title?: string;
  isSecondary?: boolean;
};

const CommonSubmitButton: React.FC<CommonSubmitButtonProps> = ({
  onPress,
  title,
  isSecondary,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 100,
        backgroundColor: isSecondary ? "gray" : "#124D15",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        {title ? title : "Submit"}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonSubmitButton;
