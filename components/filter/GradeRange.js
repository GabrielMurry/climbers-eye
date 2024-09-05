import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const GradeRange = ({
  boulderGrades,
  handleMinDisplayChange,
  handleMinCompleteChange,
  handleMaxDisplayChange,
  handleMaxCompleteChange,
  minGradeDisplay,
  maxGradeDisplay,
}) => {
  const handleSlidingComplete = () => {
    console.log("HELLO");
  };
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>
          Min Grade: {boulderGrades[minGradeDisplay]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          upperLimit={maxGradeDisplay}
          value={minGradeDisplay}
          onValueChange={handleMinDisplayChange}
          onSlidingComplete={handleMinCompleteChange}
          step={1}
          maximumTrackTintColor={"#4E9152"}
          minimumTrackTintColor={"lightgray"}
        />
      </View>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>
          Max Grade: {boulderGrades[maxGradeDisplay]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          lowerLimit={minGradeDisplay}
          value={maxGradeDisplay}
          onValueChange={handleMaxDisplayChange}
          onSlidingComplete={handleMaxCompleteChange}
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
    backgroundColor: "white",
    padding: 10,
    paddingTop: 20,
    marginTop: -10,
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
