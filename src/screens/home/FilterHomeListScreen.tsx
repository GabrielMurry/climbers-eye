import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import GradeRange from "../../components/filter/GradeRange";
import SortBy from "../../components/filter/SortBy";
import Activity from "../../components/filter/Activity";
import Circuits from "../../components/filter/Circuits";
import ClimbType from "../../components/filter/ClimbType";
import Status from "../../components/filter/Status";
import FilterHeader from "../../components/filter/FilterHeader";

const FilterHomeListScreen = () => {
  const [showGradeRange, setShowGradeRange] = useState(false);

  const handleGradeRangePress = () => {
    setShowGradeRange(!showGradeRange);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilterHeader />
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 30,
          paddingHorizontal: 10,
        }}
      >
        <SortBy />
        <GradeRange />
        <Activity />
        <Circuits />
        <ClimbType />
        <Status />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterHomeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,255)",
    width: "100%",
    height: "100%",
    // gap: 10,
  },
  resetButtonContainer: {
    alignItems: "flex-end",
  },
  resetButton: {
    padding: 10,
  },
  sortBox: {
    backgroundColor: "white",
    width: "100%",
  },
  sortBoxGradeRange: {
    width: "100%",
    backgroundColor: "white",
  },
  rowHeaderTitle: {
    fontWeight: "bold",
    color: "black",
  },
  rowHeader: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(245,245,245,255)",
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
});
