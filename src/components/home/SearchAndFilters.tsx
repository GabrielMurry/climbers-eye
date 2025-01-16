import { View, TouchableOpacity } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import { AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const SearchAndFilters = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <SearchInput />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          aspectRatio: 1,
        }}
        onPress={() =>
          navigation.navigate("TabsStack", {
            screen: "HomeStack",
            params: { screen: "FilterHomeList" },
          })
        }
      >
        <AdjustmentsHorizontalIcon size={30} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchAndFilters;
