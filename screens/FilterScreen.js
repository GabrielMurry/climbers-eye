import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftCircleIcon, CheckIcon } from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterSortBy,
  setFilterMinGradeIndex,
  setFilterMaxGradeIndex,
  setFilterClimbType,
  setFilterStatus,
  resetFilterCircuits,
} from "../redux/actions";
import { boulderGrades } from "../utils/constants/boulderConstants";
import FilterButton from "../components/filterComponents/FilterButton";
import GradeRange from "../components/filterComponents/GradeRange";
import filterLists from "../utils/constants/filterListConstants";
import Header from "../components/general/Header";
import useCustomHeader from "../hooks/useCustomHeader";

const FilterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { sortBy, climbType, status } = filterLists(); // destructure the returned object

  const {
    filterSortBy,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterClimbType,
    filterStatus,
    filterCircuits,
  } = useSelector((state) => state.spraywallReducer);

  const [showGradeRange, setShowGradeRange] = useState(false);

  const minGrade = boulderGrades[filterMinGradeIndex];
  const maxGrade = boulderGrades[filterMaxGradeIndex];

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Filters",
  });

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

  const handleResetFilters = () => {
    dispatch(setFilterSortBy("popular"));
    dispatch(setFilterMinGradeIndex(0));
    dispatch(setFilterMaxGradeIndex(boulderGrades.length - 1));
    dispatch(setFilterClimbType("boulder"));
    dispatch(setFilterStatus("all"));
    dispatch(resetFilterCircuits());
  };

  const handleCircuitsPress = () => {
    navigation.navigate("FilterCircuit");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 30,
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetFilters}
          >
            <Text>Reset Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Sort By</Text>
          </View>
          {sortBy.map((item) => (
            <FilterButton
              key={item.id}
              title={item.title}
              filterType={filterSortBy}
              filter={item.filter}
              onPress={item.onPress}
            />
          ))}
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
          <GradeRange
            boulderGrades={boulderGrades}
            filterMinGradeIndex={filterMinGradeIndex}
            handleMinGradeChange={handleMinGradeChange}
            filterMaxGradeIndex={filterMaxGradeIndex}
            handleMaxGradeChange={handleMaxGradeChange}
          />
        )}
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Circuits</Text>
          </View>
          {filterCircuits.length > 0 ? (
            filterCircuits.map((item) => (
              <FilterButton
                key={item.id}
                title={item.name}
                circuitColor={item.color}
                onPress={handleCircuitsPress}
              />
            ))
          ) : (
            <FilterButton title={"-"} onPress={handleCircuitsPress} />
          )}
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Climb Type</Text>
          </View>
          {climbType.map((item) => (
            <FilterButton
              key={item.id}
              title={item.title}
              filterType={filterClimbType}
              filter={item.filter}
              onPress={item.onPress}
            />
          ))}
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Status</Text>
          </View>
          {status.map((item) => (
            <FilterButton
              key={item.id}
              title={item.title}
              filterType={filterStatus}
              filter={item.filter}
              onPress={item.onPress}
            />
          ))}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

export default FilterScreen;

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
  sortBoxGradeRange: (showGradeRange) => ({
    width: "100%",
    backgroundColor: "white",
  }),
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
