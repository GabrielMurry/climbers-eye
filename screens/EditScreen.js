import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  GymType,
  GymName,
  GymLocation,
  SprayWallName,
  SprayWallImage,
} from "../components/editGymComponents/Display";
import useCustomHeader from "../hooks/useCustomHeader";

const EditScreen = ({ navigation, route }) => {
  const { item } = route?.params;

  const [newImage, setNewImage] = useState({
    url: null,
    width: null,
    height: null,
  });

  useEffect(() => {
    if (route?.params?.image) {
      const { image } = route.params;
      setNewImage(image);
    }
  }, [route]);

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: item.title,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      {item.title === "Gym Type" ? (
        <GymType />
      ) : item.title === "Gym Name" ? (
        <GymName />
      ) : item.title === "Gym Location" ? (
        <GymLocation />
      ) : item.title === "Spray Wall Name" ? (
        <SprayWallName spraywall={item.spraywall} navigation={navigation} />
      ) : item.title === "Spray Wall Image" ? (
        <SprayWallImage
          spraywall={item.spraywall}
          navigation={navigation}
          image={newImage}
        />
      ) : null}
    </View>
  );
};

export default EditScreen;
