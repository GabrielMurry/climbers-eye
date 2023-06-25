import { View, StyleSheet, Text } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const BrushSize = ({ brushSize, setBrushSize, selectedItem }) => {
  return (
    <View style={styles.brushSizeContainer}>
      <View style={styles.brushSizePreview}>
        {/* <View
          style={{
            backgroundColor: selectedItem,
            borderRadius: "100%",
            width: brushSize,
            height: brushSize,
          }}
        ></View> */}
        <Text style={{ color: "white" }}>{brushSize.toFixed(0)}</Text>
      </View>
      <View style={styles.brushSizeSliderContainer}>
        <Slider
          // style={{ width: 200, height: 40 }}
          value={brushSize}
          minimumValue={5}
          maximumValue={40}
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
