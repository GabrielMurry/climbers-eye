import { View, Text } from "react-native";
import React from "react";
import FilterButton from "./FilterButton";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setActivity } from "../../redux/features/filter/filterSlice";

const Activity = () => {
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
          Activity
        </Text>
      </View>
      <FilterButton
        title={"Liked"}
        filterType={filters.activity}
        filter={"liked"}
        onPress={() =>
          dispatch(setActivity(filters.activity === "liked" ? null : "liked"))
        }
      />
      <FilterButton
        title={"Bookmarked"}
        filterType={filters.activity}
        filter={"bookmarked"}
        onPress={() =>
          dispatch(
            setActivity(filters.activity === "bookmarked" ? null : "bookmarked")
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
  );
};

export default Activity;
