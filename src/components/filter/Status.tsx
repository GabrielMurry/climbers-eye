import { View, Text } from "react-native";
import React from "react";
import FilterButton from "./FilterButton";
import { setClimbStatus } from "../../redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/features/filter/filterSelectors";

const Status = () => {
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
          Status
        </Text>
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
  );
};

export default Status;
