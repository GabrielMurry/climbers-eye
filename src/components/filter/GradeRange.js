import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import {
  setMaxGradeIndex,
  setMinGradeIndex,
} from "../../redux/features/filter/filterSlice";
import { useDispatch } from "react-redux";

const GradeRange = ({ boulderGrades, filters }) => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(filters.minGradeIndex);
  const [max, setMax] = useState(filters.maxGradeIndex);

  const handleMinValueChange = (value) => {
    if (value <= max) {
      setMin(value);
    } else {
      setMin(max);
    }
  };

  const handleMaxValueChange = (value) => {
    if (value >= min) {
      setMax(value);
    } else {
      setMax(min);
    }
  };

  const handleMinSlidingComplete = (value) => {
    dispatch(setMinGradeIndex(value));
  };

  const handleMaxSlidingComplete = (value) => {
    dispatch(setMaxGradeIndex(value));
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>Min Grade: {boulderGrades[min]}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          upperLimit={max}
          value={min}
          onValueChange={handleMinValueChange}
          onSlidingComplete={handleMinSlidingComplete}
          step={1}
          maximumTrackTintColor={"#4E9152"}
          minimumTrackTintColor={"lightgray"}
        />
      </View>
      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>Max Grade: {boulderGrades[max]}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={boulderGrades.length - 1}
          lowerLimit={min}
          value={max}
          onValueChange={handleMaxValueChange}
          onSlidingComplete={handleMaxSlidingComplete}
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
