import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
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
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 30 }}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetFilters}
        >
          <Text>Reset Filters</Text>
        </TouchableOpacity>
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
      </ScrollView>
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
    // gap: 10,
  },
  resetButton: {
    width: "100%",
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
});
