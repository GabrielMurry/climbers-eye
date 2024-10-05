import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../../services/common/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import CircuitCard from "../../components/circuit/CircuitCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import useCustomHeader from "../../hooks/useCustomHeader";
import { removeCircuit } from "../../redux/features/filter/filterSlice";

const THEME_STYLE = "white";

const FilterCircuitScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );
  const { circuits } = useSelector((state) => state.filter);

  const CIRCUIT_ITEM_HEIGHT = 45;

  const [displayCircuits, setDisplayCircuits] = useState([]);

  // Use the custom hook
  useCustomHeader({
    navigation,
    title: "Circuits",
  });

  // for managing opening and closing rows
  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    fetchCircuitData();
  }, []);

  fetchCircuitData = async () => {
    const response = await request(
      "get",
      `filter_circuits/${user.id}/${spraywalls[spraywallIndex].id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setDisplayCircuits(response.data);
    }
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderCircuitCards = ({ item, index }) => {
    const isSelected = circuits.map((obj) => obj.id).includes(item.id);

    const handleCircuitPressed = () => {
      if (isSelected) {
        // Remove the item from global state array
        dispatch(removeCircuit(item));
      } else {
        // Add the item to the global state array
        dispatch(setCircuits(item));
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
          <CircuitCard
            circuit={item}
            height={CIRCUIT_ITEM_HEIGHT}
            isSelected={isSelected}
          />
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header navigation={navigation} title={"Circuits"} /> */}
      <View style={styles.flatListContainer}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={displayCircuits}
          renderItem={renderCircuitCards}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterCircuitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
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
