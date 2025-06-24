import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../../utils/styles";
import ModalButton from "../addBoulder/ModalButton";
import {
  ArrowUpOnSquareIcon,
  CameraIcon,
} from "react-native-heroicons/outline";

const ImageOptionsContent = () => {
  const handleCameraPressed = () => {
    console.log("hi");
  };
  const handleUploadImagePressed = () => {
    console.log("hello");
  };
  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        position: "absolute",
        bottom: 90,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: colors.primary,
      }}
    >
      <ModalButton
        onPress={handleCameraPressed}
        icon={<CameraIcon size={25} color={colors.primary} />}
        label={"Camera"}
      />
      <ModalButton
        onPress={handleUploadImagePressed}
        icon={<ArrowUpOnSquareIcon size={25} color={colors.primary} />}
        label={"Upload"}
      />
    </View>
  );
};

export default ImageOptionsContent;
