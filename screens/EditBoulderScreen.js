import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { SketchCanvas } from "rn-perfect-sketch-canvas";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ItemEditBar from "../components/ItemEditBar";
import BrushSize from "../components/BrushSize";
import ModalEditPreview from "../components/ModalEditPreview";
import axios from "../api/axios";
import { captureRef } from "react-native-view-shot";

const imageScaleDownFactor = 7;

const EditBoulderScreen = ({ route, navigation }) => {
  const { image } = route.params;

  const canvasRef = useRef();
  const zoomRef = useRef();
  const snapshotDrawingRef = useRef();
  const snapshotPhotoRef = useRef();

  const [selectedItem, setSelectedItem] = useState("green");
  const [brushSize, setBrushSize] = useState(20);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1.0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUrl, setNewUrl] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setCurrentZoomLevel(zoomRef.current.zoomLevel);
  };

  const handleDonePress = async () => {
    // WORKS! but I want the non drawn parts of image to be gray-scaled
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

    axios
      .post("/composite/", { drawing: snapshotDrawing, photo: snapshotPhoto })
      .then((response) => {
        setNewUrl(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sketch Canvas on top of Image */}
      <ReactNativeZoomableView
        // only zoom in and out when hand selected. If color selected, have max and min zoom equal eachother as to prevent zooming
        maxZoom={selectedItem === "hand" ? 5 : currentZoomLevel}
        minZoom={selectedItem === "hand" ? 0.5 : currentZoomLevel}
        // disable pan on initial zoom. Update initial zoom every time an item is selected for redundancy (if hand is selected, ENABLE pan on initial zoom)
        initialZoom={currentZoomLevel}
        disablePanOnInitialZoom={selectedItem === "hand" ? false : true}
        ref={zoomRef}
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
            strokeColor={selectedItem === "hand" ? "transparent" : selectedItem}
            strokeWidth={selectedItem === "hand" ? 0 : brushSize}
            containerStyle={styles.canvas(image, imageScaleDownFactor)}
          />
        </View>
        <Image
          ref={snapshotPhotoRef}
          source={{ uri: image.uri }}
          style={styles.image(image, imageScaleDownFactor)}
        />
      </ReactNativeZoomableView>

      {/* Item Edit Bar */}
      <ItemEditBar
        selectedItem={selectedItem}
        handleItemPress={handleItemPress}
        canvasRef={canvasRef}
      />

      {/* Brush Size preview and slider */}
      <BrushSize brushSize={brushSize} setBrushSize={setBrushSize} />

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleDonePress}>
          <Text style={styles.footerButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Preview */}
      <ModalEditPreview
        image={image}
        imageScaleDownFactor={imageScaleDownFactor}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        newUrl={newUrl}
      />
    </SafeAreaView>
  );
};

export default EditBoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
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
