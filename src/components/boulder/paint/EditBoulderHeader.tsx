import React, { RefObject, useState } from "react";
import Header from "../../common/header/Header";
import BackIcon from "../../common/header/BackIcon";
import { useNavigation } from "@react-navigation/native";
import { RefProps } from "../../canvas/CanvasBoard/types";
import * as FileSystem from "expo-file-system";
import { ImageObjUrl } from "../../../utils/types/image";
import { Text, TouchableOpacity } from "react-native";

type EditBoulderHeaderProps = {
  canvasRef: RefObject<RefProps>;
  wallImage: ImageObjUrl;
};

const EditBoulderHeader: React.FC<EditBoulderHeaderProps> = ({
  canvasRef,
  wallImage,
}) => {
  const navigation = useNavigation();

  const handleDonePress = async () => {
    try {
      const boulderLocalFile = await canvasRef.current?.saveAsLocalFile();
      if (!boulderLocalFile) {
        console.error("File URI not returned.");
        return;
      }
      navigation.navigate("BoulderStack", {
        screen: "PreviewEdit",
        params: {
          boulderImage: {
            uri: boulderLocalFile.uri,
            width: boulderLocalFile.width,
            height: boulderLocalFile.height,
          },
          wallImage: {
            uri: wallImage.url,
            width: wallImage.width,
            height: wallImage.height,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rightIcon = (
    <TouchableOpacity onPress={handleDonePress}>
      <Text style={{ color: "white" }}>Done</Text>
    </TouchableOpacity>
  );

  return <Header leftIcon={<BackIcon color="white" />} rightIcon={rightIcon} />;
};

export default EditBoulderHeader;
