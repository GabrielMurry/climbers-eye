import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ItemEditBar = ({ selectedItem, handleItemPress, canvasRef }) => {
  return (
    <View style={styles.editBarContainer}>
      {/* Undo Button */}
      <TouchableOpacity
        style={styles.undoButton}
        onPress={() => canvasRef.current?.undo()}
      >
        <FontAwesome name="undo" size={25} color="white" />
      </TouchableOpacity>
      {/* Eraser Button */}
      <TouchableOpacity
        style={
          selectedItem === "hand"
            ? styles.eraserButtonSelected
            : styles.eraserButtonUnselected
        }
        onPress={() => handleItemPress("hand")}
      >
        <FontAwesome
          name={selectedItem === "hand" ? "hand-grab-o" : "hand-stop-o"}
          size={25}
          color="white"
        />
      </TouchableOpacity>
      {/* Green Button */}
      <TouchableOpacity
        style={
          selectedItem === "green"
            ? styles.colorButtonSelected
            : styles.colorButtonUnselected
        }
        onPress={() => handleItemPress("green")}
      >
        <View style={styles.colorButton("green")}></View>
      </TouchableOpacity>
      {/* Blue Button */}
      <TouchableOpacity
        style={
          selectedItem === "blue"
            ? styles.colorButtonSelected
            : styles.colorButtonUnselected
        }
        onPress={() => handleItemPress("blue")}
      >
        <View style={styles.colorButton("blue")}></View>
      </TouchableOpacity>
      {/* Purple Button */}
      <TouchableOpacity
        style={
          selectedItem === "purple"
            ? styles.colorButtonSelected
            : styles.colorButtonUnselected
        }
        onPress={() => handleItemPress("purple")}
      >
        <View style={styles.colorButton("purple")}></View>
      </TouchableOpacity>
      {/* Red Button */}
      <TouchableOpacity
        style={
          selectedItem === "red"
            ? styles.colorButtonSelected
            : styles.colorButtonUnselected
        }
        onPress={() => handleItemPress("red")}
      >
        <View style={styles.colorButton("red")}></View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemEditBar;

const styles = StyleSheet.create({
  editBarContainer: {
    height: 50,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    columnGap: 10,
  },
  undoButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  eraserButtonSelected: {
    borderColor: "white",
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  eraserButtonUnselected: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButtonSelected: {
    borderColor: "white",
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButtonUnselected: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: (col) => ({
    backgroundColor: col,
    width: 30,
    height: 30,
  }),
  brushSizeContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  brushSizePreview: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  brushSizeSliderContainer: {
    height: 50,
    flex: 1,
    justifyContent: "center",
  },
});
