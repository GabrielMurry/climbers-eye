import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Color } from "../../canvas/ColorButton/types";

type ColorButtonProps = {
  color: Color;
  selectedColor: Color;
  setSelectedColor: (item: Color) => void;
  canMove: boolean;
  setCanMove: (canMove: boolean) => void;
};

const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  selectedColor,
  setSelectedColor,
  canMove,
  setCanMove,
}) => {
  const handleStyle = () => {
    if (color === selectedColor && !canMove) {
      return styles.colorButtonSelected;
    } else {
      return styles.colorButtonUnselected;
    }
  };

  const handleOnPress = () => {
    setSelectedColor(color);
    setCanMove(false);
  };

  return (
    <TouchableOpacity style={handleStyle()} onPress={handleOnPress}>
      <View style={[styles.colorButton, { backgroundColor: color }]}></View>
    </TouchableOpacity>
  );
};

export default ColorButton;

const styles = StyleSheet.create({
  colorButtonSelected: {
    borderColor: "white",
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  colorButtonUnselected: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});
