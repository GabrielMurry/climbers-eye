import { FlatList, Text, View } from "react-native";
import React, { memo } from "react";
import SpraywallCard from "./SpraywallCard";
import AddSpraywallCard from "./AddSpraywallCard";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywalls } from "../../redux/features/spraywall/spraywallSelectors";
import { Spraywall } from "../../utils/types/spraywall";

type FlatListSpraywallsProps = {
  spraywallsDataProp?: Spraywall[];
  highlight?: boolean;
  hasEditPermission?: boolean;
  height?: number;
};

const FlatListSpraywalls: React.FC<FlatListSpraywallsProps> = ({
  spraywallsDataProp,
  highlight = false,
  hasEditPermission,
  height,
}) => {
  const spraywalls = spraywallsDataProp
    ? spraywallsDataProp
    : useAppSelector((state) => selectSpraywalls(state));

  const renderSpraywall = ({ item }: { item: Spraywall }) => (
    <SpraywallCard spraywallCard={item} highlight={highlight} />
  );

  const renderFooter = () => <AddSpraywallCard />;

  return (
    <View style={{ paddingBottom: 10 }}>
      <FlatList
        data={spraywalls}
        renderItem={renderSpraywall}
        keyExtractor={(item, index) =>
          item ? item.id.toString() : index.toString()
        }
        contentContainerStyle={{
          gap: 10,
          height: height,
        }}
        horizontal
        ListFooterComponent={hasEditPermission ? renderFooter : null}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FlatListSpraywalls;
