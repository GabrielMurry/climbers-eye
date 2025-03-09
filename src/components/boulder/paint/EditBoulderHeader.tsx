import React, { RefObject, useState } from "react";
import Header from "../../common/header/Header";
import BackIcon from "../../common/header/BackIcon";
import { useNavigation } from "@react-navigation/native";
import { compositeBoulder } from "../../../services/boulder/boulder";
import { RefProps } from "../../canvas/CanvasBoard/types";
import * as FileSystem from "expo-file-system";
import { ImageObjUrl } from "../../../utils/types/image";
import { Text, TouchableOpacity } from "react-native";

type EditBoulderHeaderProps = {
  canvasRef: RefObject<RefProps>;
  image: ImageObjUrl;
};

const EditBoulderHeader: React.FC<EditBoulderHeaderProps> = ({
  canvasRef,
  image,
}) => {
  const navigation = useNavigation();

  const handleDonePress = async () => {
    try {
      const localFile = await canvasRef.current?.saveAsLocalFile();
      if (!localFile) {
        console.error("File URI not returned.");
        return;
      }
      navigation.navigate("BoulderStack", {
        screen: "PreviewEdit",
        params: {
          uri: localFile.uri,
          width: localFile.width,
          height: localFile.height,
        },
      });
      // console.log("------", fileUri);
      // const formData = new FormData();
      // formData.append("photo", {
      //   uri: image.url,
      //   name: "photo",
      //   type: "image/jpeg",
      // } as any);
      // formData.append("canvas", {
      //   uri: fileUri,
      //   name: "canvas",
      //   type: "image/png",
      // } as any);
      // const response = await compositeBoulder(formData);

      // if (response) {
      //   // "PreviewEdit", params: {image: response.data}
      //   navigation.navigate("BoulderStack", {
      //     screen: "PreviewEdit",
      //     params: { image: response.data },
      //   });
      // }
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
