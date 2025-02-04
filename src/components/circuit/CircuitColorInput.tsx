import { View, Text } from "react-native";
import React from "react";
import Swatch from "./Swatch";
import { CircuitColor, CircuitColors } from "../../utils/types/circuit";

type CircuitColorInputProps = {
  chosenColor: CircuitColor;
  setChosenColor: (color: CircuitColor) => void;
};

const CircuitColorInput: React.FC<CircuitColorInputProps> = ({
  chosenColor,
  setChosenColor,
}) => {
  return (
    <View style={{ gap: 5 }}>
      <Text>Circuit Color</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {CircuitColors.map((color, index) => (
          <Swatch
            swatchColor={color}
            chosenColor={chosenColor}
            setChosenColor={setChosenColor}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default CircuitColorInput;
