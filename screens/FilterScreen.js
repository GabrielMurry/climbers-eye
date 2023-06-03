import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import Slider from "@react-native-community/slider";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterSortBy,
  setFilterMinGradeIndex,
  setFilterMaxGradeIndex,
  setFilterClimbType,
  setFilterStatus,
} from "../redux/actions";
import { boulderGrades } from "../utils/constants/boulderConstants";

const FilterScreen = () => {
  const dispatch = useDispatch();
  const {
    filterSortBy,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterClimbType,
    filterStatus,
  } = useSelector((state) => state.spraywallReducer);

  const [showGradeRange, setShowGradeRange] = useState(false);

  const handleGradeRangePress = () => {
    setShowGradeRange(!showGradeRange);
  };

  const handleMinGradeChange = (value) => {
    if (value <= filterMaxGradeIndex) {
      dispatch(setFilterMinGradeIndex(value));
    } else {
      dispatch(setFilterMinGradeIndex(filterMaxGradeIndex));
    }
  };

  const handleMaxGradeChange = (value) => {
    if (value >= filterMinGradeIndex) {
      dispatch(setFilterMaxGradeIndex(value));
    } else {
      dispatch(setFilterMaxGradeIndex(filterMinGradeIndex));
    }
  };

  const minGrade = boulderGrades[filterMinGradeIndex];
  const maxGrade = boulderGrades[filterMaxGradeIndex];

  const handleResetFilters = () => {
    dispatch(setFilterSortBy("popular"));
    dispatch(setFilterMinGradeIndex(0));
    dispatch(setFilterMaxGradeIndex(boulderGrades.length - 1));
    dispatch(setFilterClimbType("boulder"));
    dispatch(setFilterStatus("all"));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
        <Text>Reset Filters</Text>
      </TouchableOpacity>
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Sort By</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterSortBy("popular"))}
        >
          <Text style={styles.rowTitle}>Most Popular</Text>
          {filterSortBy === "popular" && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterSortBy("liked"))}
        >
          <Text style={styles.rowTitle}>Liked</Text>
          {filterSortBy === "liked" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterSortBy("bookmarked"))}
        >
          <Text style={styles.rowTitle}>Bookmarked</Text>
          {filterSortBy === "bookmarked" && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterSortBy("recent"))}
        >
          <Text style={styles.rowTitle}>Most Recent</Text>
          {filterSortBy === "recent" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
      </View>
      <View style={styles.sortBoxGradeRange(showGradeRange)}>
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
      )}
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Climb Type</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterClimbType("boulder"))}
        >
          <Text style={styles.rowTitle}>Boulder</Text>
          {filterClimbType === "boulder" && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterClimbType("route"))}
        >
          <Text style={styles.rowTitle}>Route</Text>
          {filterClimbType === "route" && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.sortBox}>
        <View style={styles.rowHeader}>
          <Text style={styles.rowHeaderTitle}>Status</Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterStatus("all"))}
        >
          <Text style={styles.rowTitle}>All</Text>
          {filterStatus === "all" && <CheckIcon size={20} color={"black"} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterStatus("established"))}
        >
          <Text style={styles.rowTitle}>Established</Text>
          {(filterStatus === "established" || filterStatus === "all") && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterStatus("projects"))}
        >
          <Text style={styles.rowTitle}>Open Projects</Text>
          {(filterStatus === "projects" || filterStatus === "all") && (
            <CheckIcon size={20} color={"black"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => dispatch(setFilterStatus("drafts"))}
        >
          <Text style={styles.rowTitle}>My Drafts</Text>
          {(filterStatus === "drafts" || filterStatus === "all") && (
            <CheckIcon size={20} color={"black"} />
          )}
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
