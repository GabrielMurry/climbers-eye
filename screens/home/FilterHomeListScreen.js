import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterSortBy,
  setFilterMinGradeIndex,
  setFilterMaxGradeIndex,
  setFilterActivity,
  setFilterClimbType,
  setFilterStatus,
  resetFilterCircuits,
} from "../../redux/actions";
import { boulderGrades } from "../../utils/constants/boulderConstants";
import FilterButton from "../../components/filter/FilterButton";
import GradeRange from "../../components/filter/GradeRange";
import filterLists from "../../utils/constants/filterListConstants";
import useCustomHeader from "../../hooks/useCustomHeader";

const FilterHomeListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { activity, sortBy, climbType, status } = filterLists(); // destructure the returned object

  const {
    filterSortBy,
    filterMinGradeIndex,
    filterMaxGradeIndex,
    filterActivity,
    filterClimbType,
    filterStatus,
    filterCircuits,
  } = useSelector((state) => state.filterReducer);

  useEffect(() => {
    console.log(filterSortBy);
  }, [filterSortBy]);

  const [minGradeDisplay, setMinGradeDisplay] = useState(filterMinGradeIndex);
  const [maxGradeDisplay, setMaxGradeDisplay] = useState(filterMaxGradeIndex);

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

  const handleMinDisplayChange = (value) => {
    if (value <= maxGradeDisplay) {
      setMinGradeDisplay(value);
    } else {
      setMinGradeDisplay(maxGradeDisplay);
    }
  };

  const handleMaxDisplayChange = (value) => {
    if (value >= minGradeDisplay) {
      setMaxGradeDisplay(value);
    } else {
      setMaxGradeDisplay(minGradeDisplay);
    }
  };

  const handleMinCompleteChange = (value) => {
    dispatch(setFilterMinGradeIndex(value));
  };

  const handleMaxCompleteChange = (value) => {
    dispatch(setFilterMaxGradeIndex(value));
  };

  const handleResetFilters = () => {
    dispatch(setFilterSortBy("grade"));
    dispatch(setFilterMinGradeIndex(0));
    dispatch(setFilterMaxGradeIndex(boulderGrades.length - 1));
    dispatch(setFilterActivity(null));
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
            handleMinDisplayChange={handleMinDisplayChange}
            handleMinCompleteChange={handleMinCompleteChange}
            handleMaxDisplayChange={handleMaxDisplayChange}
            handleMaxCompleteChange={handleMaxCompleteChange}
            minGradeDisplay={minGradeDisplay}
            maxGradeDisplay={maxGradeDisplay}
          />
        )}
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Activity</Text>
          </View>
          {activity.map((item) => (
            <FilterButton
              key={item.id}
              title={item.title}
              filterType={filterActivity}
              filter={item.filter}
              onPress={item.onPress}
            />
          ))}
        </View>
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
