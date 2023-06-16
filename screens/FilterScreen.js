import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
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
import FilterButton from "../components/filterComponents/FilterButton";
import GradeRange from "../components/filterComponents/GradeRange";

const FilterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    filterSortBy,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterClimbType,
    filterStatus,
    filterCircuits,
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

  const sortByList = [
    {
      id: 1,
      title: "Most Popular",
      filter: "popular",
      onPress: () => dispatch(setFilterSortBy("popular")),
    },
    {
      id: 2,
      title: "Liked",
      filter: "liked",
      onPress: () => dispatch(setFilterSortBy("liked")),
    },
    {
      id: 3,
      title: "Bookmarked",
      filter: "bookmarked",
      onPress: () => dispatch(setFilterSortBy("bookmarked")),
    },
    // { id: 4, title: 'Circuits', filter: "circuits", onPress: () => dispatch(setFilterSortBy("circuits")) },
    {
      id: 5,
      title: "Most Recent",
      filter: "recent",
      onPress: () => dispatch(setFilterSortBy("recent")),
    },
  ];

  const climbTypeList = [
    {
      id: 1,
      title: "Boulder",
      filter: "boulder",
      onPress: () => dispatch(setFilterClimbType("boulder")),
    },
    {
      id: 2,
      title: "Route",
      filter: "route",
      onPress: () => dispatch(setFilterClimbType("route")),
    },
  ];

  const statusList = [
    {
      id: 1,
      title: "All",
      filter: "all",
      onPress: () => dispatch(setFilterStatus("all")),
    },
    {
      id: 2,
      title: "Established",
      filter: "established",
      onPress: () => dispatch(setFilterStatus("established")),
    },
    {
      id: 3,
      title: "Open Projects",
      filter: "projects",
      onPress: () => dispatch(setFilterStatus("projects")),
    },
    {
      id: 4,
      title: "My Drafts",
      filter: "drafts",
      onPress: () => dispatch(setFilterStatus("drafts")),
    },
  ];

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
          {sortByList.map((item) => (
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
            <FilterButton title={""} onPress={handleCircuitsPress} />
          )}
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Climb Type</Text>
          </View>
          {climbTypeList.map((item) => (
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
          {statusList.map((item) => (
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
