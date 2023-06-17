import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const GradeRange = ({
  boulderGrades,
  filterMinGradeIndex,
  handleMinGradeChange,
  filterMaxGradeIndex,
  handleMaxGradeChange,
}) => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>
          Min Grade: {boulderGrades[filterMinGradeIndex]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          upperLimit={filterMaxGradeIndex}
          value={filterMinGradeIndex}
          onValueChange={handleMinGradeChange}
          step={1}
          maximumTrackTintColor={"#4E9152"}
          minimumTrackTintColor={"lightgray"}
        />
      </View>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>
          Max Grade: {boulderGrades[filterMaxGradeIndex]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          lowerLimit={filterMinGradeIndex}
          value={filterMaxGradeIndex}
          onValueChange={handleMaxGradeChange}
          step={1}
          maximumTrackTintColor={"lightgray"}
          minimumTrackTintColor={"#4E9152"}
        />
      </View>
    </View>
  );
};

export default GradeRange;

const styles = StyleSheet.create({
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
