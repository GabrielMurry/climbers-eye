import { View, Text } from "react-native";
import React from "react";
import FilterButton from "./FilterButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrdering } from "../../redux/features/filter/filterSlice";
import { selectFilters } from "../../redux/features/filter/filterSelectors";

const SortBy = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => selectFilters(state));

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 40,
          justifyContent: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "rgba(245,245,245,255)",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          Sort By
        </Text>
      </View>
      <FilterButton
        title={"Grade"}
        filterType={filters.ordering}
        filter={"grade"}
        onPress={() => dispatch(setOrdering("grade"))}
      />
      <FilterButton
        title={"Popular"}
        filterType={filters.ordering}
        filter={"popular"}
        onPress={() => dispatch(setOrdering("popular"))}
      />
      <FilterButton
        title={"Newest"}
        filterType={filters.ordering}
        filter={"newest"}
        onPress={() => dispatch(setOrdering("newest"))}
      />
    </View>
  );
};

export default SortBy;
