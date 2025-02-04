import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";
import { useAppDispatch } from "../../redux/hooks";
import { resetFilters } from "../../redux/features/filter/filterSlice";

const FilterHeader = () => {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const rightText = (
    <TouchableOpacity onPress={handleResetFilters}>
      <Text>Reset Filters</Text>
    </TouchableOpacity>
  );

  return (
    <Header
      leftIcon={<BackIcon />}
      centerText="Filters"
      rightIcon={rightText}
    />
  );
};

export default FilterHeader;
