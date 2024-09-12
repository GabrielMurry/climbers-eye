import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { SketchCanvas } from "rn-perfect-sketch-canvas";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ItemEditBar from "../../components/boulder/paint/ItemEditBar";
import BrushSize from "../../components/boulder/paint/BrushSize";
import ModalEditPreview from "../../components/boulder/ModalEditPreview";
import { captureRef } from "react-native-view-shot";
import { useFocusEffect } from "@react-navigation/native";
import { request } from "../../api/requestMethods";
import { colors } from "../../utils/styles";

const screenWidth = Dimensions.get("window").width;

const EditBoulderScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const imageScaleDownFactor = image.width > image.height ? 10 : 8;

  const canvasRef = useRef();
  const zoomRef = useRef();
  const snapshotDrawingRef = useRef();
  const snapshotPhotoRef = useRef();

  const [selectedItem, setSelectedItem] = useState("green");
  const [brushSize, setBrushSize] = useState(20);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1.0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultImageUri, setResultImageUri] = useState(null);

  // resetting the canvas every time we focus on edit screen (prevent previous drawn points from showing up)
  useFocusEffect(
    useCallback(() => {
      canvasRef.current?.reset();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Edit
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleDonePress}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setCurrentZoomLevel(zoomRef.current.zoomLevel);
  };

  const handleDonePress = async () => {
    setIsModalVisible(true);
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

    const response = await request("post", "api/composite/", data);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setResultImageUri(response.data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {/* Sketch Canvas on top of Image */}
        <ReactNativeZoomableView
          // only zoom in and out when hand selected. If color selected, have max and min zoom equal eachother as to prevent zooming
          maxZoom={selectedItem === "hand" ? 10 : currentZoomLevel}
          minZoom={selectedItem === "hand" ? 1 : currentZoomLevel}
          // disable pan on initial zoom. Update initial zoom every time an item is selected for redundancy (if hand is selected, ENABLE pan on initial zoom)
          initialZoom={currentZoomLevel}
          disablePanOnInitialZoom={selectedItem === "hand" ? false : true}
          ref={zoomRef}
          visualTouchFeedbackEnabled={false}
        >
          <View
            style={{
              width: image.width / imageScaleDownFactor,
              height: image.height / imageScaleDownFactor,
            }}
            ref={snapshotDrawingRef}
          >
            <SketchCanvas
              ref={canvasRef}
              strokeColor={
                selectedItem === "hand" ? "transparent" : selectedItem
              }
              strokeWidth={selectedItem === "hand" ? 0 : brushSize}
              containerStyle={styles.canvas(image, imageScaleDownFactor)}
            />
          </View>
          <Image
            ref={snapshotPhotoRef}
            source={{ uri: image.url }}
            style={styles.image(image, imageScaleDownFactor)}
          />
        </ReactNativeZoomableView>
      </View>

      <View
        style={{
          backgroundColor: "rgba(33,34,34,0.95)",
          alignItems: "center",
          width: "100%",
          height: 130,
        }}
      >
        {/* Item Edit Bar */}
        <ItemEditBar
          selectedItem={selectedItem}
          handleItemPress={handleItemPress}
          canvasRef={canvasRef}
        />

        {/* Brush Size preview and slider */}
        <BrushSize
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          selectedItem={selectedItem}
        />
      </View>

      {/* Modal Preview */}
      <ModalEditPreview
        image={image}
        imageScaleDownFactor={imageScaleDownFactor}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        navigation={navigation}
        resultImageUri={resultImageUri}
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
  canvas: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
    opacity: 0.4,
  }),
  image: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
    position: "absolute",
    zIndex: -1,
  }),
  footerContainer: {
    backgroundColor: "lightgreen",
    height: 50,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  footerButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 10,
  },
  footerButtonText: {
    color: "white",
  },
});
