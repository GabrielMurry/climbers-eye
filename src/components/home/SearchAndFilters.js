import { View, TouchableOpacity } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";

const SearchAndFilters = ({ searchQuery, setSearchQuery, navigation }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          aspectRatio: 1,
        }}
        onPress={() =>
          navigation.navigate("Home", { screen: "FilterHomeList" })
        }
      >
        <AdjustmentsHorizontalIcon size={30} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchAndFilters;
