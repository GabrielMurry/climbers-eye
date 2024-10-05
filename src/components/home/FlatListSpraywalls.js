import { FlatList, Text } from "react-native";
import React, { memo } from "react";
import SpraywallCard from "./SpraywallCard";
import AddSpraywallCard from "./AddSpraywallCard";
import { useSelector } from "react-redux";

const FlatListSpraywalls = ({
  highlight = false,
  hasEditPermission,
  navigation,
}) => {
  const { spraywalls } = useSelector((state) => state.spraywall);

  const renderSpraywall = ({ item, index }) => (
    <SpraywallCard spraywall={item} index={index} highlight={highlight} />
  );

  const renderFooter = () => <AddSpraywallCard navigation={navigation} />;

  return (
    <FlatList
      data={spraywalls}
      renderItem={renderSpraywall}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10 }}
      horizontal
      ListFooterComponent={hasEditPermission && renderFooter}
    />
  );
};

export default FlatListSpraywalls;
