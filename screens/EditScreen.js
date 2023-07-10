import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  GymType,
  GymName,
  GymLocation,
  SprayWalls,
} from "../components/editGymComponents/Display";

const EditScreen = ({ navigation, route }) => {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item}</Text>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ padding: 10, flex: 1 }}>
      {item === "Gym Type" ? (
        <GymType />
      ) : item === "Gym Name" ? (
        <GymName />
      ) : item === "Gym Location" ? (
        <GymLocation />
      ) : item === "Spray Walls" ? (
        <SprayWalls navigation={navigation} />
      ) : null}
    </View>
  );
};

export default EditScreen;
