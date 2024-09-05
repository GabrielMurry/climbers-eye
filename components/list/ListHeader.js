import { View } from "react-native";
import React from "react";
import FlatListSpraywalls from "./FlatListSpraywalls";
import GymAndOptions from "./GymAndOptions";
import SearchAndFilters from "./SearchAndFilters";

// gym name, gym options (only if owner) flat list of spray walls, search input, filters
const ListHeader = ({
  gym,
  setIsModalVisible,
  spraywalls,
  handleSpraywallPress,
  searchQuery,
  setSearchQuery,
  handleFilterPress,
  hasFilters,
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
        spraywalls={spraywalls}
        handleSpraywallPress={handleSpraywallPress}
        highlight={true}
        hasEditPermission={hasEditPermission}
        navigation={navigation}
      />
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasFilters={hasFilters}
        handleFilterPress={handleFilterPress}
      />
    </View>
  );
};

export default ListHeader;

// export default memo(
//   ListHeader,
//   (prevProps, nextProps) => prevProps.searchQuery === nextProps.searchQuery
// );
