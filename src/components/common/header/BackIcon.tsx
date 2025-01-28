import { TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

type BackIconProps = {
  color?: string;
};

const BackIcon: React.FC<BackIconProps> = ({ color }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.goBack()}>
      <ChevronLeftIcon size={25} color={color ? color : "black"} />
    </TouchableOpacity>
  );
};

export default BackIcon;
