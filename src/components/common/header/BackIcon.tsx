import { TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const BackIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.goBack()}>
      <ChevronLeftIcon size={25} color="black" />
    </TouchableOpacity>
  );
};

export default BackIcon;
