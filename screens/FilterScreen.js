import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import Slider from "@react-native-community/slider";

const gradeRanges = [
  "4a/V0",
  "4b/V0",
  "4c/V0",
  "5a/V1",
  "5b/V1",
  "5c/V2",
  "6a/V3",
  "6a+/V3",
  "6b/V4",
  "6b+/V4",
  "6c/V5",
  "6c+/V5",
  "7a/V6",
  "7a+/V7",
  "7b/V8",
  "7b+/V8",
  "7c/V9",
  "7c+/V10",
  "8a/V11",
  "8a+/V12",
  "8b/V13",
  "8b+/V14",
  "8c/V15",
  "8c+/V16",
];

const FilterScreen = () => {
  const [sortBy, setSortBy] = useState("popular");
  const [minGradeIndex, setMinGradeIndex] = useState(0);
  const [maxGradeIndex, setMaxGradeIndex] = useState(gradeRanges.length - 1);
  const [showGradeRange, setShowGradeRange] = useState(false);
  const [climbType, setClimbType] = useState("boulders");
  const [status, setStatus] = useState("established");

  const handleGradeRangePress = () => {
    setShowGradeRange(!showGradeRange);
  };

  const handleMinGradeChange = (value) => {
    if (value <= maxGradeIndex) {
      setMinGradeIndex(value);
    } else {
      setMinGradeIndex(maxGradeIndex);
    }
  };

  const handleMaxGradeChange = (value) => {
    if (value >= minGradeIndex) {
      setMaxGradeIndex(value);
    } else {
      setMaxGradeIndex(minGradeIndex);
    }
  };

  const minGrade = gradeRanges[minGradeIndex];
  const maxGrade = gradeRanges[maxGradeIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton}>
        <Text>Reset Filters</Text>
      </TouchableOpacity>
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Sort By</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSortBy("popular")}
        >
          <Text style={styles.rowTitle}>Most Popular</Text>
          {sortBy === "popular" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => setSortBy("liked")}>
          <Text style={styles.rowTitle}>Liked</Text>
          {sortBy === "liked" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSortBy("bookmarked")}
        >
          <Text style={styles.rowTitle}>Bookmarked</Text>
          {sortBy === "bookmarked" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSortBy("recent")}
        >
          <Text style={styles.rowTitle}>Most Recent</Text>
          {sortBy === "recent" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
      </View>
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Grade Range</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={handleGradeRangePress}>
          <Text style={styles.rowTitle}>{`${minGrade} - ${maxGrade}`}</Text>
          <CheckIcon size={20} color={"black"} />
        </TouchableOpacity>
      </View>
      {showGradeRange && (
        <View style={styles.sliderContainer}>
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderLabel}>
              Min Grade: {gradeRanges[minGradeIndex]}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={gradeRanges.length - 1}
              upperLimit={maxGradeIndex}
              value={minGradeIndex}
              onValueChange={handleMinGradeChange}
              step={1}
              maximumTrackTintColor={"#4E9152"}
              minimumTrackTintColor={"lightgray"}
            />
          </View>
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderLabel}>
              Max Grade: {gradeRanges[maxGradeIndex]}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={gradeRanges.length - 1}
              lowerLimit={minGradeIndex}
              value={maxGradeIndex}
              onValueChange={handleMaxGradeChange}
              step={1}
              maximumTrackTintColor={"lightgray"}
              minimumTrackTintColor={"#4E9152"}
            />
          </View>
        </View>
      )}
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Climb Type</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setClimbType("boulders")}
        >
          <Text style={styles.rowTitle}>Boulders</Text>
          {climbType === "boulders" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setClimbType("routes")}
        >
          <Text style={styles.rowTitle}>Routes</Text>
          {climbType === "routes" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
      </View>
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Status</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setStatus("established")}
        >
          <Text style={styles.rowTitle}>Established</Text>
          {status === "established" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setStatus("projects")}
        >
          <Text style={styles.rowTitle}>Open Projects</Text>
          {status === "projects" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setStatus("drafts")}
        >
          <Text style={styles.rowTitle}>My Drafts</Text>
          {status === "drafts" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    height: "100%",
    gap: 10,
  },
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
    borderRadius: 10,
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
