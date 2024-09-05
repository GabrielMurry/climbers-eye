import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../../api/requestMethods";
import { useSelector } from "react-redux";
import CircuitCard from "../../components/circuit/CircuitCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PlusIcon } from "react-native-heroicons/outline";
import useCustomHeader from "../../hooks/useCustomHeader";
import { useFocusEffect } from "@react-navigation/native";
import { updateBoulder } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CircuitScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { boulder } = route.params;
  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const CIRCUIT_ITEM_HEIGHT = 45;

  const [circuits, setCircuits] = useState([]);

  // for managing opening and closing rows
  let row = [];
  let prevOpenedRow;

  const headerRight = (
    <TouchableOpacity onPress={() => navigation.navigate("AddNewCircuit")}>
      <PlusIcon size={25} color={"black"} />
    </TouchableOpacity>
  );

  useCustomHeader({
    navigation,
    title: "Add to Circuit",
    headerRight,
  });

  useFocusEffect(
    useCallback(() => {
      fetchCircuitData();
    }, [])
  );

  useEffect(() => {
    const inCircuit = circuits.some((circuit) => circuit.containsBoulder);
    dispatch(updateBoulder(boulder.id, { inCircuit }));
  }, [circuits]);

  fetchCircuitData = async () => {
    const response = await request(
      "get",
      `api/circuit_list/${spraywalls[spraywallIndex].id}`
    );
    if (response.status === 200) {
      const manipulatedCircuits = response.data.map((circuit) => ({
        ...circuit,
        containsBoulder: circuit.boulders.includes(boulder.id),
      }));
      setCircuits(manipulatedCircuits);
    } else {
      console.error(response.status);
      return;
    }
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderCircuitCards = ({ item: circuit, index }) => {
    const optimisticUpdate = () => {
      setCircuits((prevCircuits) => {
        const newCircuits = [...prevCircuits];
        newCircuits[index].containsBoulder =
          !newCircuits[index].containsBoulder;
        return newCircuits;
      });
    };

    const handleCircuitPressed = async () => {
      // temp isSelected because we optimistically update circuit (circuit).isSelected before api call
      const tempIsSelected = circuit.containsBoulder;
      const method = tempIsSelected ? "delete" : "post";
      optimisticUpdate();
      const response = await request(
        method,
        `api/boulder_in_circuit/${circuit.id}/${boulder.id}`
      );
      if (response.status !== 200) {
        console.log(response.status);
        optimisticUpdate();
        return;
      }
    };

    const renderRightView = (onDeleteHandler) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="red"
            onPress={(e) => onDeleteHandler(e)}
            title="DELETE"
          />
        </View>
      );
    };

    const onDelete = () => {
      Alert.alert(
        "Delete Circuit",
        `Are you sure you want to delete "${circuit.name}"?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              row[index].close();
            },
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await request(
                "delete",
                `api/circuit/${circuit.id}`
              );
              if (response.status === 204) {
                row[index].close();
                setCircuits((prevCircuits) =>
                  prevCircuits.filter(
                    (prevCircuit) => prevCircuit.id !== circuit.id
                  )
                );
              } else {
                console.log(response.status);
                return;
              }
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightView(onDelete)}
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
      >
        <Pressable onPress={handleCircuitPressed}>
          <CircuitCard circuit={circuit} height={CIRCUIT_ITEM_HEIGHT} />
        </Pressable>
      </Swipeable>
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
          keyExtractor={(item) => item.id}
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
  titleContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  flatListContainer: {
    marginTop: 15,
    flex: 1,
  },
  flatList: {
    gap: 15,
    paddingHorizontal: 20,
  },
  addNewCircuitButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "100%",
    position: "absolute",
    bottom: 30,
    right: 25,
    // adding shadow to add new circuit button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
