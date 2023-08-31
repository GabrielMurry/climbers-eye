import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";
import CircuitCard from "../components/circuitComponents/CircuitCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PlusIcon } from "react-native-heroicons/outline";
import useCustomHeader from "../hooks/useCustomHeader";
import { useFocusEffect } from "@react-navigation/native";

const CircuitScreen = ({ route, navigation }) => {
  const { boulder } = route.params;
  const { user } = useSelector((state) => state.userReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const CIRCUIT_ITEM_HEIGHT = 45;

  const [circuits, setCircuits] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

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

  fetchCircuitData = async () => {
    const response = await request(
      "get",
      `circuits/${user.id}/${spraywalls[spraywallIndex].id}/${boulder.id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setCircuits(response.data);
    }
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderCircuitCards = ({ item, index }) => {
    const optimisticUpdate = () => {
      setCircuits((prevCircuits) => {
        const newCircuits = [...prevCircuits];
        const index = newCircuits.findIndex((i) => i.id === item.id);
        newCircuits[index].isSelected = !newCircuits[index].isSelected;
        return newCircuits;
      });
    };

    const handleCircuitPressed = async () => {
      // temp isSelected because we optimistically update item (circuit).isSelected before api call
      const tempIsSelected = item.isSelected;
      optimisticUpdate();
      const response = await request(
        tempIsSelected ? "delete" : "post",
        `add_or_remove_boulder_in_circuit/${item.id}/${boulder.id}`
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
        `Are you sure you want to delete "${item.name}"?`,
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
                `delete_circuit/${user.id}/${spraywalls[spraywallIndex].id}/${item.id}`
              );
              if (response.status !== 200) {
                console.log(response.status);
                return;
              }
              fetchCircuitData();
              row[index].close();
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
          <CircuitCard circuit={item} height={CIRCUIT_ITEM_HEIGHT} />
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
      {/* <TouchableOpacity
        style={{
          alignItems: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.navigate("AddNewCircuit")}
      >
        <Text>Add New Circuit</Text>
      </TouchableOpacity> */}
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
