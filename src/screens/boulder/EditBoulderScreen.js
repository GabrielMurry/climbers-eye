import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import React, { useRef, useState } from "react";
import { compositeBoulder } from "../../services/boulder/boulder";
import { useFetch } from "../../hooks/useFetch";
import ToolBar from "../../components/boulder/paint/ToolBar";
import ImageCanvas from "../../components/boulder/paint/ImageCanvas";
import useCustomHeader from "../../hooks/useCustomHeader";
import * as FileSystem from "expo-file-system";
import LoadingFadeOverlay from "../../components/common/LoadingFadeOverlay";

const EditBoulderScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const canvasRef = useRef(null);
  const snapshotDrawingRef = useRef(null);
  const snapshotPhotoRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState("green");
  const [strokeWidth, setStrokeWidth] = useState(20);

  const [fetchComposite, isLoadingComposite, isErrorComposite] =
    useFetch(compositeBoulder);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  const saveBase64AsFile = async (base64) => {
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
    const canvasImageUri = await saveBase64AsFile(canvasImageBase64);
    const formData = new FormData();
    if (image.url.startsWith("https")) {
      // Add the S3 URL as a string field
      formData.append("image", {
        uri: image.url,
        name: "photo.jpeg",
        type: "image/jpeg",
      });
    } else {
      formData.append("image", {
        uri: image.url,
        name: "photo.png",
        type: "image/png",
      });
    }
    const fileName = canvasImageUri.split("/").pop();
    formData.append("canvas", {
      uri: canvasImageUri,
      name: fileName,
      type: "image/png",
    });
    const response = await fetchComposite(formData);
    if (response) {
      navigation.navigate("BoulderStack", {
        screen: "PreviewEdit",
        params: { image: response.data },
      });
    }
  };

  useCustomHeader({
    navigation,
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
