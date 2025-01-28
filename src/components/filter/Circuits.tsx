import { View, Text } from "react-native";
import React from "react";
import { selectCircuits } from "../../redux/features/circuit/circuitSelectors";
import { useAppSelector } from "../../redux/hooks";
import FilterCircuitButton from "./FilterCircuitButton";
import FilterButton from "./FilterButton";

const Circuits = () => {
  const circuits = useAppSelector((state) => selectCircuits(state));
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 40,
          justifyContent: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "rgba(245,245,245,255)",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          Circuits
        </Text>
      </View>
      {circuits.length > 0 ? (
        circuits.map((circuit) => (
          <FilterCircuitButton
            key={circuit.id}
            title={circuit.name}
            color={circuit.color}
            circuitId={circuit.id}
          />
        ))
      ) : (
        <FilterButton title={"-"} />
      )}
    </View>
  );
};

export default Circuits;
