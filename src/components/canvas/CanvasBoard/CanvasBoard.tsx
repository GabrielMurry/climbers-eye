import {
  Canvas,
  ImageFormat,
  Path,
  Skia,
  useCanvasRef,
} from "@shopify/react-native-skia";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { CanvasBoardProps, PathWithColorAndWidth, RefProps } from "./types";
import { runOnJS } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

const CanvasBoard = forwardRef<RefProps, CanvasBoardProps>(
  (
    {
      width = useWindowDimensions().width,
      height = useWindowDimensions().height,
      enabled = true,
      color,
      strokeWidth,
      opacity,
    },
    ref: Ref<RefProps>
  ) => {
    const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);

    const cRef = useCanvasRef();
    const cRefColorMask = useCanvasRef();

    const onDrawingStart = (x: number, y: number) => {
      setPaths((currentPaths) => {
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        newPath.lineTo(x + 0, y + 0);
        return [
          ...currentPaths,
          {
            path: newPath,
            color,
            strokeWidth,
          },
        ];
      });
    };

    const onDrawingActive = (x: number, y: number) => {
      setPaths((currentPaths) => {
        const currentPath = currentPaths[currentPaths.length - 1];
        const lastPoint = currentPath.path.getLastPt();
        const xMid = (lastPoint.x + x) / 2;
        const yMid = (lastPoint.y + y) / 2;
        currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
        return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
      });
    };

    const panGesture = Gesture.Pan()
      .enabled(enabled)
      .onBegin((e) => {
        if (enabled) {
          runOnJS(onDrawingStart)(e.x, e.y);
        }
      })
      .onUpdate((e) => {
        if (enabled) {
          runOnJS(onDrawingActive)(e.x, e.y);
        }
      });

    const handleUndo = () => {
      setPaths((currentPaths) => {
        if (currentPaths.length === 0) return currentPaths;
        return currentPaths.slice(0, -1);
      });
    };

    const handleSaveAsBase64 = async () => {
      try {
        const image = await cRef.current?.makeImageSnapshotAsync();
        if (image) {
          return image.encodeToBase64(ImageFormat.JPEG);
        }
      } catch (error) {
        throw new Error(`Save as base64 error: ${error}`);
      }
    };

    const handleSaveAsLocalFile = async () => {
      try {
        const image = await cRefColorMask.current?.makeImageSnapshotAsync();
        if (image) {
          const base64 = image.encodeToBase64(ImageFormat.PNG);
          const uri = FileSystem.cacheDirectory + `${uuid.v4()}.png`;
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const { width, height } = await Image.getSize(uri);
          return { uri, width, height };
        }
      } catch (error) {
        throw new Error(`Save as local file error: ${error}`);
      }
    };

    useImperativeHandle(ref, () => ({
      clearCanvas: () => setPaths([]),
      getPaths: () => paths,
      undo: handleUndo,
      saveAsBase64: handleSaveAsBase64,
      saveAsLocalFile: handleSaveAsLocalFile,
    }));

    return (
      <>
        {/* Main canvas (visible) */}
        <GestureDetector gesture={panGesture}>
          <Canvas ref={cRef} style={{ width, height }}>
            {paths.map((path, index) => (
              <Path
                key={index}
                path={path.path}
                color={path.color}
                style={"stroke"}
                strokeWidth={path.strokeWidth}
                strokeCap="round"
                opacity={opacity}
              />
            ))}
          </Canvas>
        </GestureDetector>
        {/* Hidden canvas - does not have low opacity - used to send as the boulder mask to backend */}
        <Canvas
          ref={cRefColorMask}
          style={{ width, height, position: "absolute", left: -9999 }}
        >
          {paths.map((path, index) => (
            <Path
              key={index}
              path={path.path}
              color={path.color}
              style={"stroke"}
              strokeWidth={path.strokeWidth}
              strokeCap="round"
              opacity={1}
            />
          ))}
        </Canvas>
      </>
    );
  }
);

export default CanvasBoard;
