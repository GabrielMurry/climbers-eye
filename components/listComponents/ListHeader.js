import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import {
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
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
      {spraywalls.length === 0 ? (
        <Text>Missing Spraywall</Text>
      ) : (
        <>
          <FlatListSpraywalls
            spraywalls={spraywalls}
            handleSpraywallPress={handleSpraywallPress}
            highlight={true}
          />
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            hasFilters={hasFilters}
            handleFilterPress={handleFilterPress}
          />
        </>
      )}
    </View>
  );
};

export default ListHeader;

// export default memo(
//   ListHeader,
//   (prevProps, nextProps) => prevProps.searchQuery === nextProps.searchQuery
// );
