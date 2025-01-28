import React, { RefObject } from "react";
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

  const saveBase64AsFile = async (base64: string) => {
    const fileUri = `${FileSystem.cacheDirectory}canvas-image.png`;

    try {
      // Ensure a Base64 string
      if (typeof base64 !== "string") {
        throw new Error("Must be a Base64-encoded string.");
      }

      // Write Base64 string to a file
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(`File saved at: ${fileUri}`);
      return fileUri;
    } catch (error) {
      console.error("Error saving file:", error);
      throw error;
    }
  };

  const handleDonePress = async () => {
    const canvasImageBase64 = await canvasRef.current?.saveAsBase64();
    if (!canvasImageBase64) {
      console.error("Unable to save canvas as base64.");
      return;
    }
    const canvasImageUri = await saveBase64AsFile(canvasImageBase64);
    const formData = new FormData();
    formData.append("image", {
      uri: image.url,
      name: "photo",
      type: "image/jpeg",
    } as any);
    formData.append("canvas", {
      uri: canvasImageUri,
      name: "canvas",
      type: "image/jpeg",
    } as any);
    // await createImageFormData(formData, image.url, "photo");
    // await createImageFormData(formData, canvasImageUri, "canvas");
    const response = await compositeBoulder(formData);

    if (response) {
      // "PreviewEdit", params: {image: response.data}
      navigation.navigate("BoulderStack", {
        screen: "PreviewEdit",
        params: { image: response.data },
      });
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
