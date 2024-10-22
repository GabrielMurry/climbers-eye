import { View, Text, StyleSheet, Pressable, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { Swipeable } from "react-native-gesture-handler";
import { useFetch } from "../../hooks/useFetch";
import { deleteCircuitAPI } from "../../services/circuit";
import {
  addBoulderToCircuitAPI,
  removeBoulderFromCircuitAPI,
} from "../../services/boulder";
import {
  removeBoulderFromCircuit,
  addBoulderToCircuit,
  deleteCircuit,
} from "../../redux/features/circuit/circuitSlice";
import { useDispatch } from "react-redux";

const CircuitCard = ({ circuit, index, height, boulder }) => {
  const dispatch = useDispatch();
  const [fetchAddBoulder, isLoadingAddBoulder, isErrorAddBoulder] = useFetch(
    addBoulderToCircuitAPI
  );

  const [fetchRemoveBoulder, isLoadingRemoveBoulder, isErrorRemoveBoulder] =
    useFetch(removeBoulderFromCircuitAPI);

  const [
    fetchDeleteCircuitAPI,
    isLoadingDeleteCircuitAPI,
    isErrorDeleteCircuitAPI,
  ] = useFetch(deleteCircuitAPI);

  const [isChecked, setIsChecked] = useState(false);

  const isBoulderInCircuit = () => {
    return circuit.boulders.some(
      (circuitBoulder) => circuitBoulder === boulder.id
    );
  };

  console.log(circuit);

  useEffect(() => {
    setIsChecked(isBoulderInCircuit);
  }, [circuit]);

  // for managing opening and closing rows
  let row = [];
  let prevOpenedRow;

  const performRequest = async (method) => {
    const pathParams = { circuitId: circuit.id, boulderId: boulder.id };
    switch (method) {
      case "post":
        dispatch(addBoulderToCircuit(circuit.id, boulder.id));
        return await fetchAddBoulder({ pathParams });
      case "delete":
        dispatch(removeBoulderFromCircuit(circuit.id, boulder.id));
        return await fetchRemoveBoulder({ pathParams });
      default:
        console.error("Invalid method.");
    }
  };

  const handleCircuitPressed = async () => {
    const method = handleIsBoulderInCircuit() ? "delete" : "post";
    const response = performRequest(method);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
  };

  const handleIsBoulderInCircuit = () => {
    const circuitBoulderIds = circuit.boulders;
    return circuitBoulderIds.some(
      (circuitBoulderId) => circuitBoulderId === boulder.id
    );
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

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
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
            const pathParams = { circuitId: circuit.id };
            dispatch(deleteCircuit(circuit.id));
            await fetchDeleteCircuitAPI({ pathParams });
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
      <Pressable
        onPress={handleCircuitPressed}
        style={styles.container(height)}
      >
        <View style={styles.color(circuit)} />
        <View style={styles.cardInfoContainer}>
          <Text>{circuit.name}</Text>
          {isChecked ? (
            <CheckIcon size={25} color={"black"} style={{ marginRight: 5 }} />
          ) : null}
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default CircuitCard;

const styles = StyleSheet.create({
  container: (height) => ({
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    height: height,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  }),
  color: (circuit) => ({
    width: 15,
    height: 15,
    borderRadius: "100%",
    backgroundColor: circuit.color,
  }),
  cardInfoContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
