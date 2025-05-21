import { View, Text, Switch } from "react-native";
import React from "react";
import { NewCircuit } from "../../screens/circuit/CreateCircuitScreen";

type PrivateCircuitInputProps = {
  newCircuit: NewCircuit;
  setNewCircuit: (value: React.SetStateAction<NewCircuit>) => void;
};

const PrivateCircuitInput: React.FC<PrivateCircuitInputProps> = ({
  newCircuit,
  setNewCircuit,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 5,
      }}
    >
      <Text
        style={{
          fontSize: 16,
        }}
      >
        Private Circuit
      </Text>
      <Switch
        value={newCircuit.private}
        onValueChange={() =>
          setNewCircuit((prev) => ({ ...prev, private: !prev.private }))
        }
      />
    </View>
  );
};

export default PrivateCircuitInput;
