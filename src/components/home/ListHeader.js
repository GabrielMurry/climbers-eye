import { View } from "react-native";
import React from "react";
import FlatListSpraywalls from "./FlatListSpraywalls";
import GymAndOptions from "./GymAndOptions";
import SearchAndFilters from "./SearchAndFilters";

// gym name, gym options (only if owner) flat list of spray walls, search input, filters
const ListHeader = ({
  gym,
  setIsModalVisible,
  searchQuery,
  setSearchQuery,
  hasEditPermission,
  navigation,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 200,
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <GymAndOptions gym={gym} setIsModalVisible={setIsModalVisible} />
      <FlatListSpraywalls
        highlight={true}
        hasEditPermission={hasEditPermission}
        navigation={navigation}
      />
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navigation={navigation}
      />
    </View>
  );
};

export default ListHeader;
