import { View, StyleSheet } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const BrushSize = ({ brushSize, setBrushSize }) => {
  return (
    <View style={styles.brushSizeContainer}>
      <View style={styles.brushSizePreview}>
        <View
          style={{
            backgroundColor: "black",
            borderRadius: "100%",
            width: brushSize,
            height: brushSize,
          }}
        ></View>
      </View>
      <View style={styles.brushSizeSliderContainer}>
        <Slider
          // style={{ width: 200, height: 40 }}
          value={20}
          minimumValue={5}
          maximumValue={50}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(newSize) => setBrushSize(newSize)}
        />
      </View>
    </View>
  );
};

export default BrushSize;

const styles = StyleSheet.create({
  brushSizeContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  brushSizePreview: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  brushSizeSliderContainer: {
    backgroundColor: "pink",
    height: 50,
    flex: 1,
    justifyContent: "center",
  },
});
