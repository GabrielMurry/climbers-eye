import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type CommonSubmitButtonProps = {
  onPress: () => void;
};

const CommonSubmitButton: React.FC<CommonSubmitButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 100,
        backgroundColor: "#124D15",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 50,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Submit
      </Text>
    </TouchableOpacity>
  );
};

export default CommonSubmitButton;
