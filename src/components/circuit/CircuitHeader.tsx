import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";
import { PlusIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const CircuitHeader = () => {
  const navigation = useNavigation();

  const RightIcon = (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CircuitStack", { screen: "CreateCircuit" })
      }
    >
      <PlusIcon size={25} color={"black"} />
    </TouchableOpacity>
  );
  return (
    <Header
      leftIcon={<BackIcon />}
      centerText="Add to Circuit"
      rightIcon={RightIcon}
    />
  );
};

export default CircuitHeader;
