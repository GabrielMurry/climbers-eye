import React from "react";
import Header from "../common/header/Header";
import { TouchableOpacity } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const MapHeader = () => {
  const navigation = useNavigation();

  const RightIcon = (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("GymStack", {
          screen: "AddGym",
        })
      }
    >
      <PlusIcon size={25} color={"black"} />
    </TouchableOpacity>
  );

  return <Header leftText="Find Your Gym" rightIcon={RightIcon} />;
};

export default MapHeader;
