import { View, Pressable } from "react-native";
import React from "react";
import { CircuitColor } from "../../screens/circuit/CreateCircuitScreen";

type SwatchProps = {
  swatchColor: CircuitColor;
  chosenColor: CircuitColor;
  setChosenColor: (color: CircuitColor) => void;
};

const Swatch: React.FC<SwatchProps> = ({
  swatchColor,
  chosenColor,
  setChosenColor,
}) => {
  return (
    <Pressable
      style={{
        width: 30,
        height: 30,
        borderRadius: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: swatchColor,
      }}
      onPress={() => setChosenColor(swatchColor)}
    >
      {swatchColor === chosenColor ? (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: "100%",
            backgroundColor: "white",
          }}
        />
      ) : null}
    </Pressable>
  );
};

export default Swatch;
