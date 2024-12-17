import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { compositeBoulder } from "../../services/boulder/boulder";
import ToolBar from "../../components/boulder/paint/ToolBar";
import ImageCanvas from "../../components/boulder/paint/ImageCanvas";
import useCustomHeader from "../../hooks/useCustomHeader";
import * as FileSystem from "expo-file-system";
import { EditBoulderScreenProps } from "../../navigation/BoulderStack";
import { RefProps } from "../../components/canvas/CanvasBoard/types";
import { createImageFormData } from "../../utils/formData";

const EditBoulderScreen: React.FC<EditBoulderScreenProps> = ({
  route,
  navigation,
}) => {
  const { image } = route.params;

  const canvasRef = useRef<RefProps>(null);
  const snapshotDrawingRef = useRef(null);
  const snapshotPhotoRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState("green");
  const [strokeWidth, setStrokeWidth] = useState(20);

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
  };

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
    await createImageFormData(formData, image.url, "photo");
    await createImageFormData(formData, canvasImageUri, "canvas");
    const response = await compositeBoulder(formData);

    if (response) {
      // "PreviewEdit", params: {image: response.data}
      navigation.navigate("PreviewEdit", response.data);
    }
  };

  useCustomHeader({
    title: "Edit",
    screenName: route.name,
    headerRightOnPress: handleDonePress,
  });

  return (
    <View style={styles.container}>
      <ImageCanvas
        selectedItem={selectedItem}
        image={image}
        snapshotDrawingRef={snapshotDrawingRef}
        strokeWidth={strokeWidth}
        canvasRef={canvasRef}
        snapshotPhotoRef={snapshotPhotoRef}
      />
      <ToolBar
        selectedItem={selectedItem}
        handleItemPress={handleItemPress}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        canvasRef={canvasRef}
      />
    </View>
  );
};

export default EditBoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,255)",
  },
});
