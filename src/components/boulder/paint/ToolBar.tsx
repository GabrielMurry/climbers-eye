import { View, StyleSheet } from "react-native";
import React, { RefObject } from "react";
import ItemEditBar from "./ItemEditBar";
import BrushSize from "./BrushSize";
import { Color } from "../../canvas/ColorButton/types";
import { RefProps } from "../../canvas/CanvasBoard/types";

type ToolBarProps = {
  selectedColor: Color | null;
  setSelectedColor: (item: Color | null) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  canvasRef: RefObject<RefProps>;
};

const ToolBar: React.FC<ToolBarProps> = ({
  selectedColor,
  setSelectedColor,
  strokeWidth,
  setStrokeWidth,
  canvasRef,
}) => {
  return (
    <View style={styles.container}>
      {/* Item Edit Bar */}
      <ItemEditBar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        canvasRef={canvasRef}
      />

      {/* Brush Size preview and slider */}
      <BrushSize brushSize={strokeWidth} setBrushSize={setStrokeWidth} />
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
