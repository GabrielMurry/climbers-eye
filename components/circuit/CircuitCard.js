import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";

const CircuitCard = ({ circuit, height }) => {
  return (
    <View style={styles.container(height)}>
      <View style={styles.color(circuit)} />
      <View style={styles.cardInfoContainer}>
        <Text>{circuit.name}</Text>
        {circuit.containsBoulder ? (
          <CheckIcon size={25} color={"black"} style={{ marginRight: 5 }} />
        ) : null}
      </View>
    </View>
  );
};

export default CircuitCard;

const styles = StyleSheet.create({
  container: (height) => ({
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    height: height,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  }),
  color: (circuit) => ({
    width: 15,
    height: 15,
    borderRadius: "100%",
    backgroundColor: circuit.color,
  }),
  cardInfoContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
