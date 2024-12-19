import { View } from "react-native";
import React from "react";
import FlatListSpraywalls from "./FlatListSpraywalls";
import GymAndOptions from "./GymAndOptions";
import SearchAndFilters from "./SearchAndFilters";

type ListHeaderProps = {
  setIsModalVisible: (isVisible: boolean) => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  hasEditPermission: boolean;
};

// gym name, gym options (only if owner) flat list of spray walls, search input, filters
const ListHeader: React.FC<ListHeaderProps> = ({
  setIsModalVisible,
  searchQuery,
  setSearchQuery,
  hasEditPermission,
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
      <GymAndOptions setIsModalVisible={setIsModalVisible} />
      <FlatListSpraywalls
        highlight={true}
        hasEditPermission={hasEditPermission}
      />
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
};

export default ListHeader;
