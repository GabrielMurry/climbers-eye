import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { request } from "../../api/requestMethods";

const CircuitBottomSheet = ({
  setBottomSheetVisible,
  circuits,
  setCircuits,
  userID,
  spraywallID,
}) => {
  const [newCircuitName, setNewCircuitName] = useState("");
  const [newCircuitDescription, setNewCircuitDescription] = useState("");
  const [newCircuitColor, setNewCircuitColor] = useState("green");
  const [isNewCircuitPrivate, setIsNewCircuitPrivate] = useState(false);
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["95%"], []);

  const handleConfirmNewCircuit = async () => {
    const data = {
      name: newCircuitName,
      description: newCircuitDescription,
      color: newCircuitColor,
      private: isNewCircuitPrivate,
      person: userID,
      spraywall: spraywallID,
    };
    const response = await request(
      "post",
      `circuit/${userID}/${spraywallID}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      // append new circuit (which is an object) to 'circuits'
      setCircuits([...circuits, response.data]);
      setBottomSheetVisible(false);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      //   onChange={handleSheetChanges} when sheet is -1 --> keyboard.dismiss() for redundancy?
      style={styles.bottomSheetContainer}
      handleIndicatorStyle={{ backgroundColor: "white" }}
    >
      <View style={styles.bottomSheet}>
        <View style={styles.newCircuitHeader}>
          <TouchableOpacity
            style={styles.newCircuitButton}
            onPress={() => setBottomSheetVisible(false)}
          >
            <Text style={styles.newCircuitButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.newCircuitTitle}>New Circuit</Text>
          <TouchableOpacity
            style={styles.newCircuitButton}
            onPress={handleConfirmNewCircuit}
          >
            <Text style={styles.newCircuitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newCircuitTextInputContainer}>
          <Text style={styles.subTitles}>Circuit Name</Text>
          <TextInput
            style={styles.newCircuitTextInput("name")}
            value={newCircuitName}
            onChangeText={(value) => setNewCircuitName(value)}
            placeholder="Enter circuit name"
            autoComplete="off"
            autoFocus
          />
        </View>
        <View style={styles.newCircuitTextInputContainer}>
          <Text style={styles.subTitles}>Circuit Description</Text>
          <TextInput
            style={styles.newCircuitTextInput("description")}
            value={newCircuitDescription}
            onChangeText={(value) => setNewCircuitDescription(value)}
            placeholder="New circuit description (optional)..."
            autoComplete="off"
            multiline={true}
          />
        </View>
        <View style={styles.colorSwatchContainer}>
          <Pressable
            style={styles.colorSwatchButton("green")}
            onPress={() => setNewCircuitColor("green")}
          >
            {newCircuitColor === "green" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("blue")}
            onPress={() => setNewCircuitColor("blue")}
          >
            {newCircuitColor === "blue" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("yellow")}
            onPress={() => setNewCircuitColor("yellow")}
          >
            {newCircuitColor === "yellow" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("pink")}
            onPress={() => setNewCircuitColor("pink")}
          >
            {newCircuitColor === "pink" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("orange")}
            onPress={() => setNewCircuitColor("orange")}
          >
            {newCircuitColor === "orange" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("red")}
            onPress={() => setNewCircuitColor("red")}
          >
            {newCircuitColor === "red" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("purple")}
            onPress={() => setNewCircuitColor("purple")}
          >
            {newCircuitColor === "purple" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
          <Pressable
            style={styles.colorSwatchButton("black")}
            onPress={() => setNewCircuitColor("black")}
          >
            {newCircuitColor === "black" ? (
              <View style={styles.selectedSwatchIndicator} />
            ) : null}
          </Pressable>
        </View>
        <View style={styles.privateCircuitContainer}>
          <Text style={styles.privateCircuitText}>Private Circuit</Text>
          <Switch
            value={isNewCircuitPrivate}
            onValueChange={() => setIsNewCircuitPrivate(!isNewCircuitPrivate)}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default CircuitBottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  bottomSheet: {
    paddingHorizontal: 20,
    gap: 22,
  },
  newCircuitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  newCircuitButton: {
    width: 55,
    alignItems: "center",
  },
  newCircuitButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgb(0, 122, 255)",
  },
  newCircuitTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  newCircuitTextInputContainer: {
    width: "100%",
    gap: 5,
  },
  newCircuitTextInput: (type) => ({
    backgroundColor: "rgb(229, 228, 226)",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    height: type === "description" ? 75 : 35,
  }),
  colorSwatchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  colorSwatchButton: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  }),
  selectedSwatchIndicator: {
    width: 6,
    height: 6,
    borderRadius: "100%",
    backgroundColor: "white",
  },
  subTitles: {
    fontWeight: "bold",
  },
  privateCircuitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  privateCircuitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
