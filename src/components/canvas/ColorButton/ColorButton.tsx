import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ColorButtonProps } from "./types";

const ColorButton = ({ color, onPress, isSelected }: ColorButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        style.colorButton,
        { backgroundColor: color },
        isSelected && {
          borderWidth: 2,
          borderColor: "black",
        },
      ]}
    />
  );
};

export default ColorButton;

const style = StyleSheet.create({
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});
