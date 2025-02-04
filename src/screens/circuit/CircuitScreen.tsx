import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import React from "react";
import CircuitCard from "../../components/circuit/CircuitCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CircuitStackParamList } from "../../navigation/CircuitStack";
import { useAppSelector } from "../../redux/hooks";
import { selectCircuits } from "../../redux/features/circuit/circuitSelectors";
import { Circuit } from "../../utils/types/circuit";
import CircuitHeader from "../../components/circuit/CircuitHeader";

type CircuitScreenProps = NativeStackScreenProps<
  CircuitStackParamList,
  "Circuit"
>;

const CircuitScreen: React.FC<CircuitScreenProps> = ({ route }) => {
  const circuits = useAppSelector((state) => selectCircuits(state));
  const { boulder } = route.params;

  const CIRCUIT_ITEM_HEIGHT = 45;

  const renderCircuitCards = ({ item }: { item: Circuit }) => {
    return (
      <CircuitCard
        circuit={item}
        height={CIRCUIT_ITEM_HEIGHT}
        boulder={boulder}
      />
    );
  };

  // footer in list to provide a 'gap' or 'space' at the bottom for the user to scroll to (so all circuits are visible and the last circuit row is not covered by the 'add new circuit' button)
  const renderFooter = () => {
    return <View style={{ height: CIRCUIT_ITEM_HEIGHT }} />;
  };

  const renderEmptyList = () => {
    return (
      <View>
        <Text>No Circuits Created</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CircuitHeader />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={circuits}
        renderItem={renderCircuitCards}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
};

export default CircuitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flatList: {
    gap: 15,
    paddingHorizontal: 20,
  },
});
