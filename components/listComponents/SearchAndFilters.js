import { View, TouchableOpacity } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { colors } from "../../utils/styles";

const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  hasFilters,
  handleFilterPress,
}) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TouchableOpacity
        style={{
          backgroundColor: hasFilters ? colors.primary : null,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          aspectRatio: 1,
        }}
        onPress={handleFilterPress}
      >
        <AdjustmentsHorizontalIcon
          size={30}
          color={hasFilters ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchAndFilters;
