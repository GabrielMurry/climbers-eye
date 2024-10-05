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
import { boulderGrades } from "../../utils/constants/boulderConstants";
import FilterButton from "../../components/filter/FilterButton";
import GradeRange from "../../components/filter/GradeRange";
import useCustomHeader from "../../hooks/useCustomHeader";
import {
  resetFilters,
  setActivity,
  setClimbStatus,
  setClimbType,
  setSortBy,
} from "../../redux/features/filter/filterSlice";

const FilterHomeListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filter);

  const [showGradeRange, setShowGradeRange] = useState(false);

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Filters",
  });

  const handleGradeRangePress = () => {
    setShowGradeRange(!showGradeRange);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleCircuitsPress = () => {
    navigation.navigate("CircuitStack", { screen: "FilterCircuit" });
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
          <FilterButton
            title={"Grade"}
            filterType={filters.sortBy}
            filter={"grade"}
            onPress={() => dispatch(setSortBy("grade"))}
          />
          <FilterButton
            title={"Popular"}
            filterType={filters.sortBy}
            filter={"popular"}
            onPress={() => dispatch(setSortBy("popular"))}
          />
          <FilterButton
            title={"Newest"}
            filterType={filters.sortBy}
            filter={"newest"}
            onPress={() => dispatch(setSortBy("newest"))}
          />
        </View>
        <View style={styles.sortBoxGradeRange(showGradeRange)}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Grade Range</Text>
          </View>
          <TouchableOpacity style={styles.row} onPress={handleGradeRangePress}>
            <Text style={styles.rowTitle}>{`${
              boulderGrades[filters.minGradeIndex]
            } - ${boulderGrades[filters.maxGradeIndex]}`}</Text>
            <CheckIcon size={20} color={"black"} />
          </TouchableOpacity>
        </View>
        {showGradeRange && (
          <GradeRange boulderGrades={boulderGrades} filters={filters} />
        )}
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Activity</Text>
          </View>
          <FilterButton
            title={"Liked"}
            filterType={filters.activity}
            filter={"liked"}
            onPress={() =>
              dispatch(
                setActivity(filters.activity === "liked" ? null : "liked")
              )
            }
          />
          <FilterButton
            title={"Bookmarked"}
            filterType={filters.activity}
            filter={"bookmarked"}
            onPress={() =>
              dispatch(
                setActivity(
                  filters.activity === "bookmarked" ? null : "bookmarked"
                )
              )
            }
          />
          <FilterButton
            title={"Sent"}
            filterType={filters.activity}
            filter={"sent"}
            onPress={() =>
              dispatch(setActivity(filters.activity === "sent" ? null : "sent"))
            }
          />
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Circuits</Text>
          </View>
          {filters.circuits.length > 0 ? (
            filters.circuits.map((item) => (
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
          <FilterButton
            title={"Boulder"}
            filterType={filters.climbType}
            filter={"boulder"}
            onPress={() => dispatch(setClimbType("boulder"))}
          />
          <FilterButton
            title={"Route"}
            filterType={filters.climbType}
            filter={"route"}
            onPress={() => dispatch(setClimbType("route"))}
          />
        </View>
        <View style={styles.sortBox}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderTitle}>Status</Text>
          </View>
          <FilterButton
            title={"All"}
            filterType={filters.climbStatus}
            filter={"all"}
            onPress={() => dispatch(setClimbStatus("all"))}
          />
          <FilterButton
            title={"Established"}
            filterType={filters.climbStatus}
            filter={"established"}
            onPress={() => dispatch(setClimbStatus("established"))}
          />
          <FilterButton
            title={"Open Projects"}
            filterType={filters.climbStatus}
            filter={"projects"}
            onPress={() => dispatch(setClimbStatus("projects"))}
          />
          <FilterButton
            title={"My Drafts"}
            filterType={filters.climbStatus}
            filter={"drafts"}
            onPress={() => dispatch(setClimbStatus("drafts"))}
          />
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
