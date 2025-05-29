import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinkIcon } from "react-native-heroicons/outline";
import { Boulder } from "../../../utils/types/boulder";
import { useNavigation } from "@react-navigation/native";

type AddToCircuitButtonProps = {
  boulder: Boulder;
};

const AddToCircuitButton: React.FC<AddToCircuitButtonProps> = ({ boulder }) => {
  const navigation = useNavigation();

  const handleCircuitPressed = () => {
    navigation.navigate("BoulderStack", {
      screen: "AddBoulderToCircuit",
      params: { boulder },
    });
  };

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgray",
      }}
      onPress={handleCircuitPressed}
    >
      <LinkIcon size={25} color={boulder.inCircuit ? "blue" : "lightgray"} />
    </TouchableOpacity>
  );
};

export default AddToCircuitButton;
