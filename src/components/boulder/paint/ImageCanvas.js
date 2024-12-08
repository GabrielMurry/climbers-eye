import { View, Image, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { CanvasBoard } from "../../canvas";
import {
  scaledImageHeight,
  scaledImageWidth,
} from "../../../utils/imageScaling";

const ImageCanvas = ({
  selectedItem,
  image,
  snapshotDrawingRef,
  strokeWidth,
  canvasRef,
  snapshotPhotoRef,
}) => {
  const scaledWidth = scaledImageWidth();
  const scaledHeight = scaledImageHeight(image.height, image.width);

  return (
    <ReactNativeZoomableView
      zoomEnabled={selectedItem === "hand" ? true : false}
      panEnabled={selectedItem === "hand" ? true : false}
      maxZoom={10}
      minZoom={1}
      visualTouchFeedbackEnabled={false}
    >
      <View
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
        ref={snapshotDrawingRef}
      >
        <CanvasBoard
          disableBrush={selectedItem === "hand" ? true : false}
          color={selectedItem}
          strokeWidth={strokeWidth}
          width={scaledWidth}
          height={scaledHeight}
          opacity={0.5}
          ref={canvasRef}
        />
      </View>
      <Image
        source={{ uri: image.url }}
        style={{
          width: scaledWidth,
          height: scaledHeight,
          position: "absolute",
          zIndex: -1,
        }}
        ref={snapshotPhotoRef}
      />
    </ReactNativeZoomableView>
  );
};

export default ImageCanvas;
