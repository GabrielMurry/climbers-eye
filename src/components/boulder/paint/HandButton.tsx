import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type HandButtonProps = {
  canMove: boolean;
  setCanMove: (canMove: boolean) => void;
};

const HandButton: React.FC<HandButtonProps> = ({ canMove, setCanMove }) => {
  return (
    <TouchableOpacity
      style={canMove ? styles.handButtonSelected : styles.handButtonUnselected}
      onPress={() => setCanMove(true)}
    >
      <FontAwesome
        name={canMove ? "hand-grab-o" : "hand-stop-o"}
        size={25}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default HandButton;

const styles = StyleSheet.create({
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
});
