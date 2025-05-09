import React, { RefObject, useState } from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { CanvasBoard } from "../../canvas";
import {
  scaledImageHeight,
  scaledImageWidth,
} from "../../../utils/imageScaling";
import { ImageObjUrl } from "../../../utils/types/image";
import { RefProps } from "../../canvas/CanvasBoard/types";
import { Color } from "../../canvas/ColorButton/types";
import { Image } from "expo-image";
import { View } from "react-native";

type ImageCanvasProps = {
  selectedColor: Color;
  image: ImageObjUrl;
  strokeWidth: number;
  canMove: boolean;
  canvasRef: RefObject<RefProps>;
};

const INITIAL_ZOOM = 1;

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  selectedColor,
  image,
  strokeWidth,
  canMove,
  canvasRef,
}) => {
  const scaledWidth = scaledImageWidth();
  const scaledHeight = scaledImageHeight(image.height, image.width);

  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM);

  return (
    <ReactNativeZoomableView
      zoomEnabled={canMove}
      panEnabled={canMove}
      maxZoom={10}
      minZoom={1}
      visualTouchFeedbackEnabled={false}
      disableMomentum={!canMove} // Weird jitter when user paints on canvas. Enable momentum only when user can move the image and canvas. Disable when painting.
      initialZoom={zoomLevel} // Component is rerendering every time 'canMove' changes. Rerendering makes initialZoom 1. So if user is zoomed in, it will zoom out to original. We reinitialize initialZoom to whatever the new zoom is to fix this issue.
      onZoomEnd={(event, gestureState, zoomableViewEventObj) =>
        setZoomLevel(zoomableViewEventObj.zoomLevel)
      }
    >
      <CanvasBoard
        enabled={!canMove}
        color={selectedColor}
        strokeWidth={strokeWidth}
        width={scaledWidth}
        height={scaledHeight}
        ref={canvasRef}
      />
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
