import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../utils/styles";
import { PlusIcon } from "react-native-heroicons/outline";

const AddSpraywallCard = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        height: "100%",
        aspectRatio: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("AddNewSprayWall")}
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
