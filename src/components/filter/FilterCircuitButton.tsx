import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { useDispatch } from "react-redux";
import {
  resetCircuit,
  setCircuit,
} from "../../redux/features/filter/filterSlice";
import { Filter } from "../../utils/types/filter";

type FilterCircuitButtonProps = {
  title: string;
  color: string;
  filters: Filter;
  circuitId: number;
};

const FilterCircuitButton: React.FC<FilterCircuitButtonProps> = ({
  title,
  color,
  filters,
  circuitId,
}) => {
  const dispatch = useDispatch();

  const isSelected = () => {
    return filters.circuit === circuitId;
  };

  const onPress = () => {
    if (isSelected()) {
      dispatch(resetCircuit());
    } else {
      dispatch(setCircuit(circuitId));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circuitsContainer}>
        <View style={[styles.circuitColor, { backgroundColor: color }]} />
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      {isSelected() ? <CheckIcon size={20} color={"black"} /> : null}
    </TouchableOpacity>
  );
};

export default FilterCircuitButton;

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
  circuitColor: {
    width: 10,
    height: 10,
    borderRadius: "100%",
  },
  rowTitle: {
    color: "black",
  },
});
