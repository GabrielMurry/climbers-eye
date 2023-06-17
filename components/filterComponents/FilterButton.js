import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";

const FilterButton = ({
  filterType,
  title,
  filter = null,
  onPress,
  circuitColor = null,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {circuitColor ? (
        <>
          <View style={styles.circuitsContainer}>
            <View style={styles.circuitColor(circuitColor)} />
            <Text style={styles.rowTitle}>{title}</Text>
          </View>
          <CheckIcon size={20} color={"black"} />
        </>
      ) : (
        <>
          <Text style={styles.rowTitle}>{title}</Text>
          {filterType === filter && <CheckIcon size={20} color={"black"} />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  circuitsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circuitColor: (circuitColor) => ({
    width: 10,
    height: 10,
    borderRadius: "100%",
    backgroundColor: circuitColor,
  }),
  rowTitle: {
    color: "black",
  },
});
