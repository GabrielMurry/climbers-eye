import { FlatList } from "react-native";
import React from "react";
import SpraywallCard from "./SpraywallCard";

const FlatListSpraywalls = ({
  spraywalls,
  handleSpraywallPress,
  highlight = false,
}) => {
  const renderSpraywall = ({ item, index }) => (
    <SpraywallCard
      spraywall={item}
      index={index}
      handleSpraywallPress={handleSpraywallPress}
      highlight={highlight}
    />
  );

  return (
    <FlatList
      data={spraywalls}
      renderItem={renderSpraywall}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10 }}
      horizontal
    />
  );
};

export default FlatListSpraywalls;
