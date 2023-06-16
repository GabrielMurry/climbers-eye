import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";

const FilterButton = ({
  filterType,
  title,
  filter,
  onPress,
  circuitColor = null,
}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {circuitColor ? (
        <View style={styles.circuitsContainer}>
          <View style={styles.circuitColor(circuitColor)} />
          <Text style={styles.rowTitle}>{title}</Text>
        </View>
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
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    height: "100%",
    gap: 10,
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
  resetButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
  },
  sortBox: {
    width: "100%",
    backgroundColor: "#FFFBF1",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    // adding shadow to sorting boxes
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  sortBoxGradeRange: (showGradeRange) => ({
    width: "100%",
    backgroundColor: "#FFFBF1",
    borderWidth: showGradeRange ? 0 : 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "black",
    borderRadius: showGradeRange ? 0 : 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // adding shadow to sorting boxes
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  }),
  rowHeaderTitle: {
    fontWeight: "bold",
  },
  rowHeader: {
    backgroundColor: "#CFE6D0",
    width: "100%",
    height: 40,
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  rowTitle: {
    color: "black",
  },
  sliderContainer: {
    backgroundColor: "#FFFBF1",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    // adding shadow to slider box
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  sliderWrapper: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    color: "black",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
  },
});
