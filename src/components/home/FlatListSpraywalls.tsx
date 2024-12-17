import { FlatList, Text } from "react-native";
import React, { memo } from "react";
import SpraywallCard from "./SpraywallCard";
import AddSpraywallCard from "./AddSpraywallCard";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywalls } from "../../redux/features/spraywall/spraywallSelectors";
import { Spraywall } from "../../utils/types/spraywall";

type FlatListSpraywallsProps = {
  highlight: boolean;
  hasEditPermission: boolean;
};

const FlatListSpraywalls: React.FC<FlatListSpraywallsProps> = ({
  highlight = false,
  hasEditPermission,
}) => {
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));

  const renderSpraywall = ({ item }: { item: Spraywall }) => (
    <SpraywallCard spraywallCard={item} highlight={highlight} />
  );

  const renderFooter = () => <AddSpraywallCard />;

  return (
    <FlatList
      data={spraywalls}
      renderItem={renderSpraywall}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10 }}
      horizontal
      ListFooterComponent={hasEditPermission ? renderFooter : null}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FlatListSpraywalls;
