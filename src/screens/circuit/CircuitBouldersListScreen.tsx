import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect } from "react";
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

  const {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders,
    nextPageBoulders,
  } = useBoulderData();

  useEffect(() => {
    dispatch(setCircuit(circuitId));
  }, [circuitId]);

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={boulders}
        renderItem={({ item }) => <BoulderCard boulder={item} />}
        style={{ paddingHorizontal: padding.general }}
        ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
      />
    </View>
  );
};

export default CircuitBouldersListScreen;
