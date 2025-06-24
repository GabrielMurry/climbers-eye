import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CircuitStackParamList } from "../../navigation/CircuitStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useBoulderData } from "../../hooks/useBoulderData";
import { setCircuit } from "../../redux/features/filter/filterSlice";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BoulderCard from "../../components/common/boulderCard/BoulderCard";
import { padding } from "../../utils/styles";
import Empty from "../../components/common/flatList/Empty";
import { Boulder } from "../../utils/types/boulder";

type CircuitBouldersListScreenProps = NativeStackScreenProps<
  CircuitStackParamList,
  "CircuitBoulders"
>;

const CircuitBouldersListScreen: React.FC<CircuitBouldersListScreenProps> = ({
  route,
}) => {
  const insets = useSafeAreaInsets();
  const circuitId = route.params.circuitId;
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => selectFilters(state));
  const [isLoading, setIsLoading] = useState(true);

  const {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders,
    nextPageBoulders,
  } = useBoulderData();

  // useEffect(() => {
  //   dispatch(setCircuit(circuitId));
  // }, [circuitId]);

  // useEffect(() => {
  //   console.log(boulders);
  // }, [boulders]);

  const renderBoulderCard = ({ item }: { item: Boulder }) => {
    // if (isLoading) return null;
    return <BoulderCard boulder={item} />;
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={boulders}
        renderItem={renderBoulderCard}
        style={{ paddingHorizontal: padding.general }}
        ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
      />
    </View>
  );
};

export default CircuitBouldersListScreen;
