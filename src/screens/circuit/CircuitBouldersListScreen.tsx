import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CircuitStackParamList } from "../../navigation/CircuitStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useBoulderData } from "../../hooks/useBoulderData";
import { setCircuit } from "../../redux/features/filter/filterSlice";
import { selectFilters } from "../../redux/features/filter/filterSelectors";

type CircuitBouldersListScreenProps = NativeStackScreenProps<
  CircuitStackParamList,
  "CircuitBoulders"
>;

const CircuitBouldersListScreen: React.FC<CircuitBouldersListScreenProps> = ({
  route,
}) => {
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

  useEffect(() => {
    console.log(boulders);
    console.log(boulders.length);
  }, [boulders]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <SafeAreaView>
      <Text>CircuitBouldersListScreen</Text>
    </SafeAreaView>
  );
};

export default CircuitBouldersListScreen;
