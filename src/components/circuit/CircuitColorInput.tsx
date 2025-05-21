import { View, Text } from "react-native";
import React from "react";
import Swatch from "./Swatch";
import { CircuitColor, CircuitColors } from "../../utils/types/circuit";
import { NewCircuit } from "../../screens/circuit/CreateCircuitScreen";

type CircuitColorInputProps = {
  newCircuit: NewCircuit;
  setNewCircuit: (value: React.SetStateAction<NewCircuit>) => void;
};

const CircuitColorInput: React.FC<CircuitColorInputProps> = ({
  newCircuit,
  setNewCircuit,
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
            chosenColor={newCircuit.color}
            setChosenColor={(color) =>
              setNewCircuit((prev) => ({ ...prev, color: color }))
            }
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default CircuitColorInput;
