import { View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../utils/styles";
import { PlusIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const AddSpraywallCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        height: "100%",
        aspectRatio: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() =>
        navigation.navigate("SpraywallStack", { screen: "AddNewSprayWall" })
      }
    >
      <View
        style={{
          height: "110%",
          aspectRatio: 1,
          position: "absolute",
          borderRadius: 2,
          backgroundColor: colors.primaryLight,
          borderColor: colors.primaryLight,
          borderWidth: 2,
        }}
      />
      <PlusIcon color={colors.primary} />
    </TouchableOpacity>
  );
};

export default AddSpraywallCard;
