import { View, Text } from "react-native";
import React from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import GymSection from "../../components/gym/GymSection";
import DeleteGym from "../../components/gym/DeleteGym";
import SpraywallSection from "../../components/spraywall/SpraywallSection";

const EditGymScreen = ({ navigation }) => {
  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Gym",
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
        paddingHorizontal: 10,
      }}
    >
      <GymSection navigation={navigation} />
      <SpraywallSection navigation={navigation} />
      <DeleteGym navigation={navigation} />
    </View>
  );
};

export default EditGymScreen;
