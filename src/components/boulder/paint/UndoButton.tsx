import { TouchableOpacity } from "react-native";
import React, { RefObject } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RefProps } from "../../canvas/CanvasBoard/types";

type UndoButtonProps = {
  canvasRef: RefObject<RefProps>;
};

const UndoButton: React.FC<UndoButtonProps> = ({ canvasRef }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => canvasRef.current?.undo()}
    >
      <FontAwesome name="undo" size={25} color="white" />
    </TouchableOpacity>
  );
};

export default UndoButton;
