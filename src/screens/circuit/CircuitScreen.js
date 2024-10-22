import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CircuitCard from "../../components/circuit/CircuitCard";
import useCustomHeader from "../../hooks/useCustomHeader";

const CircuitScreen = ({ route, navigation }) => {
  const { circuits } = useSelector((state) => state.circuit);
  const { boulder } = route.params;

  const CIRCUIT_ITEM_HEIGHT = 45;

  useCustomHeader({
    navigation,
    title: "Add to Circuit",
    headerRightOnPress: () =>
      navigation.navigate("CircuitStack", { screen: "AddNewCircuit" }),
    screenName: route.name,
  });

  const renderCircuitCards = ({ item, index }) => {
    return (
      <CircuitCard
        circuit={item}
        index={index}
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
      <View style={styles.flatListContainer}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={circuits}
          renderItem={renderCircuitCards}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
    </SafeAreaView>
  );
};

export default CircuitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flatListContainer: {
    marginTop: 15,
    flex: 1,
  },
  flatList: {
    gap: 15,
    paddingHorizontal: 20,
  },
});
