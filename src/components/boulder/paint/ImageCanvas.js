import { View, Image, StyleSheet } from "react-native";
import React from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { CanvasBoard } from "../../canvas";

const ImageCanvas = ({
  selectedItem,
  currentZoomLevel,
  zoomRef,
  image,
  snapshotDrawingRef,
  strokeWidth,
  canvasRef,
  snapshotPhotoRef,
}) => {
  const imageScaleDownFactor = image.width > image.height ? 10 : 8;

  return (
    <ReactNativeZoomableView
      disablePanOnInitialZoom={selectedItem === "hand" ? false : true}
      maxZoom={10}
      minZoom={1}
      initialZoom={currentZoomLevel}
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
        <CanvasBoard
          disableBrush={selectedItem === "hand" ? true : false}
          color={selectedItem}
          strokeWidth={strokeWidth}
          width={image.width / imageScaleDownFactor}
          height={image.height / imageScaleDownFactor}
          opacity={0.5}
          ref={canvasRef}
        />
      </View>
      <Image
        source={{ uri: image.url }}
        style={styles.image(image, imageScaleDownFactor)}
        ref={snapshotPhotoRef}
      />
    </ReactNativeZoomableView>
  );
};

export default ImageCanvas;

const styles = StyleSheet.create({
  image: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
    position: "absolute",
    zIndex: -1,
  }),
});
