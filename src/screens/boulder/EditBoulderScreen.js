import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";
import { compositeBoulder } from "../../services/boulder";
import { useFetch } from "../../hooks/useFetch";
import ToolBar from "../../components/boulder/paint/ToolBar";
import ImageCanvas from "../../components/boulder/paint/ImageCanvas";
import useCustomHeader from "../../hooks/useCustomHeader";

const EditBoulderScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const canvasRef = useRef();
  const zoomRef = useRef();
  const snapshotDrawingRef = useRef();
  const snapshotPhotoRef = useRef();

  const [selectedItem, setSelectedItem] = useState("green");
  const [strokeWidth, setStrokeWidth] = useState(20);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1.0);

  const [fetchComposite, isLoadingComposite, isErrorComposite] =
    useFetch(compositeBoulder);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setCurrentZoomLevel(zoomRef.current.zoomLevel);
  };

  const handleDonePress = async () => {
    // snapshot of drawing in base64 png
    const snapshotDrawing = await captureRef(snapshotDrawingRef, {
      format: "png",
      quality: 1,
      result: "base64",
    }).then(
      (base64) => {
        return base64;
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
    // snapshot of photo in base64 png
    const snapshotPhoto = await captureRef(snapshotPhotoRef, {
      format: "png",
      quality: 1,
      result: "base64",
    }).then(
      (base64) => {
        return base64;
      },
      (error) => console.error("Oops, snapshot failed", error)
    );

    const data = { drawing: snapshotDrawing, photo: snapshotPhoto };

    const response = await fetchComposite({ data });
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      navigation.navigate("BoulderStack", {
        screen: "PreviewEdit",
        params: { image, resultImageUri: response.data.uri },
      });
    }
  };

  useCustomHeader({
    navigation,
    title: "Edit",
    screenName: route.name,
    headerRightOnPress: handleDonePress,
  });

  if (isLoadingComposite) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageCanvas
        selectedItem={selectedItem}
        currentZoomLevel={currentZoomLevel}
        zoomRef={zoomRef}
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
