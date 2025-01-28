import { View, StyleSheet } from "react-native";
import React, { RefObject } from "react";
import { RefProps } from "../../canvas/CanvasBoard/types";
import { Color } from "../../canvas/ColorButton/types";
import UndoButton from "./UndoButton";
import HandButton from "./HandButton";
import ColorButton from "./ColorButton";

type ItemEditBarProps = {
  selectedColor: Color;
  setSelectedColor: (item: Color) => void;
  canMove: boolean;
  setCanMove: (canMove: boolean) => void;
  canvasRef: RefObject<RefProps>;
};

const ItemEditBar: React.FC<ItemEditBarProps> = ({
  selectedColor,
  setSelectedColor,
  canMove,
  setCanMove,
  canvasRef,
}) => {
  return (
    <View style={styles.editBarContainer}>
      <UndoButton canvasRef={canvasRef} />
      <HandButton canMove={canMove} setCanMove={setCanMove} />
      <ColorButton
        color="green"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        canMove={canMove}
        setCanMove={setCanMove}
      />
      <ColorButton
        color="blue"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        canMove={canMove}
        setCanMove={setCanMove}
      />
      <ColorButton
        color="purple"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        canMove={canMove}
        setCanMove={setCanMove}
      />
      <ColorButton
        color="red"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        canMove={canMove}
        setCanMove={setCanMove}
      />
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
  handButtonSelected: {
    borderColor: "white",
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  handButtonUnselected: {
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
    borderRadius: 10,
  },
  colorButtonUnselected: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
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
