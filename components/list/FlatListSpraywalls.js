import { FlatList, Text } from "react-native";
import React from "react";
import SpraywallCard from "./SpraywallCard";
import AddSpraywallCard from "./AddSpraywallCard";

const FlatListSpraywalls = ({
  spraywalls,
  handleSpraywallPress,
  highlight = false,
  hasEditPermission,
  navigation,
}) => {
  const renderSpraywall = ({ item, index }) => (
    <SpraywallCard
      spraywall={item}
      index={index}
      handleSpraywallPress={handleSpraywallPress}
      highlight={highlight}
    />
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
