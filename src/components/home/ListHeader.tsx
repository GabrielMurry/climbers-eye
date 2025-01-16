import { View } from "react-native";
import React from "react";
import FlatListSpraywalls from "./FlatListSpraywalls";
import GymAndOptions from "./GymAndOptions";
import SearchAndFilters from "./SearchAndFilters";

type ListHeaderProps = {
  setIsModalVisible: (isVisible: boolean) => void;
  hasEditPermission: boolean;
};

// gym name, gym options (only if owner) flat list of spray walls, search input, filters
const ListHeader: React.FC<ListHeaderProps> = ({
  setIsModalVisible,
  hasEditPermission,
}) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <SearchAndFilters />
    </View>
  );
};

export default ListHeader;
