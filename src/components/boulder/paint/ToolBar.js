import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ItemEditBar from "./ItemEditBar";
import BrushSize from "./BrushSize";

const ToolBar = ({
  selectedItem,
  handleItemPress,
  strokeWidth,
  setStrokeWidth,
  canvasRef,
}) => {
  return (
    <View style={styles.container}>
      {/* Item Edit Bar */}
      <ItemEditBar
        selectedItem={selectedItem}
        handleItemPress={handleItemPress}
        canvasRef={canvasRef}
      />

      {/* Brush Size preview and slider */}
      <BrushSize
        brushSize={strokeWidth}
        setBrushSize={setStrokeWidth}
        selectedItem={selectedItem}
      />
    </View>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(33,34,34,0.95)",
    alignItems: "center",
    width: "100%",
    height: 130,
  },
});
