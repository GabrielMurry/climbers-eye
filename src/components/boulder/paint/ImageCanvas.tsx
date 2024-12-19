import { View, Image, Dimensions } from "react-native";
import React, { Ref, RefObject, useEffect, useRef } from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { CanvasBoard } from "../../canvas";
import {
  scaledImageHeight,
  scaledImageWidth,
} from "../../../utils/imageScaling";
import { ImageObjUrl } from "../../../utils/types/image";
import { RefProps } from "../../canvas/CanvasBoard/types";
import { Color } from "../../canvas/ColorButton/types";

type ImageCanvasProps = {
  selectedColor: Color | null;
  image: ImageObjUrl;
  strokeWidth: number;
  canvasRef: RefObject<RefProps>;
};

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  selectedColor,
  image,
  strokeWidth,
  canvasRef,
}) => {
  const scaledWidth = scaledImageWidth();
  const scaledHeight = scaledImageHeight(image.height, image.width);

  return (
    <ReactNativeZoomableView
      zoomEnabled={selectedColor ? false : true}
      panEnabled={selectedColor ? false : true}
      maxZoom={10}
      minZoom={1}
      visualTouchFeedbackEnabled={false}
    >
      <View
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <CanvasBoard
          disableBrush={selectedColor ? false : true}
          color={selectedColor}
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
      />
    </ReactNativeZoomableView>
  );
};

export default ImageCanvas;
