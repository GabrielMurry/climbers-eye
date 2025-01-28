import { View, Text } from "react-native";
import React from "react";
import FilterButton from "./FilterButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { setClimbType } from "../../redux/features/filter/filterSlice";

const ClimbType = () => {
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
          Climb Type
        </Text>
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
  );
};

export default ClimbType;
