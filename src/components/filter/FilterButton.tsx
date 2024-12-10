import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";

type FilterButton = {
  filterType?: string | null;
  title?: string | null;
  filter?: string | null;
  onPress?: () => void;
  circuitColor?: string;
};

const FilterButton = (props: FilterButton) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.circuitColor ? (
        <>
          <View style={styles.circuitsContainer}>
            <View
              style={[
                styles.circuitColor,
                { backgroundColor: props.circuitColor },
              ]}
            />
            <Text style={styles.rowTitle}>{props.title}</Text>
          </View>
          <CheckIcon size={20} color={"black"} />
        </>
      ) : (
        <>
          <Text style={styles.rowTitle}>{props.title}</Text>
          {props.filterType === props.filter && (
            <CheckIcon size={20} color={"black"} />
          )}
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
  circuitColor: {
    width: 10,
    height: 10,
    borderRadius: "100%",
  },
  rowTitle: {
    color: "black",
  },
});
