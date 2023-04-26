import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

const imageScaleDownFactor = 7;

const EditBoulderScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const [currentColor, setCurrentColor] = useState("green");

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: image.uri }}
        style={styles.image(image, imageScaleDownFactor)}
      />
      {/* Edit Bar */}
      <View style={styles.editBarContainer}>
        {/* Undo Button */}
        <TouchableOpacity style={styles.undoButton}>
          <FontAwesome name="undo" size={25} color="black" />
        </TouchableOpacity>
        {/* Eraser Button */}
        <TouchableOpacity
          style={
            currentColor === "eraser"
              ? styles.eraserButtonSelected
              : styles.eraserButtonUnselected
          }
          onPress={() => setCurrentColor("eraser")}
        >
          <FontAwesome name="eraser" size={25} color="black" />
        </TouchableOpacity>
        {/* Green Button */}
        <TouchableOpacity
          style={
            currentColor === "green"
              ? styles.colorButtonSelected
              : styles.colorButtonUnselected
          }
          onPress={() => setCurrentColor("green")}
        >
          <View style={styles.colorButton("green")}></View>
        </TouchableOpacity>
        {/* Blue Button */}
        <TouchableOpacity
          style={
            currentColor === "blue"
              ? styles.colorButtonSelected
              : styles.colorButtonUnselected
          }
          onPress={() => setCurrentColor("blue")}
        >
          <View style={styles.colorButton("blue")}></View>
        </TouchableOpacity>
        {/* Purple Button */}
        <TouchableOpacity
          style={
            currentColor === "purple"
              ? styles.colorButtonSelected
              : styles.colorButtonUnselected
          }
          onPress={() => setCurrentColor("purple")}
        >
          <View style={styles.colorButton("purple")}></View>
        </TouchableOpacity>
        {/* Red Button */}
        <TouchableOpacity
          style={
            currentColor === "red"
              ? styles.colorButtonSelected
              : styles.colorButtonUnselected
          }
          onPress={() => setCurrentColor("red")}
        >
          <View style={styles.colorButton("red")}></View>
        </TouchableOpacity>
      </View>
      {/* Brush Size */}
      <View style={styles.brushSizeContainer}>
        <View style={styles.brushSizePreview}></View>
        <View style={styles.brushSizeSliderContainer}>
          <Slider
            // style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditBoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
  }),
  editBarContainer: {
    backgroundColor: "lightblue",
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
    borderColor: "black",
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
    borderColor: "black",
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
    backgroundColor: "green",
    width: 50,
    height: 50,
  },
  brushSizeSliderContainer: {
    backgroundColor: "pink",
    height: 50,
    flex: 1,
    justifyContent: "center",
  },
  footerContainer: {
    backgroundColor: "lightgreen",
    height: 50,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  footerButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 10,
  },
  footerButtonText: {
    color: "white",
  },
});
