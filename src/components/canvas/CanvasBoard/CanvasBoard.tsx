import { Canvas, Path, Skia, useCanvasRef } from "@shopify/react-native-skia";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { CanvasBoardProps, PathWithColorAndWidth, RefProps } from "./types";
import { runOnJS } from "react-native-reanimated";

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
          const bytes = image.encodeToBase64();
          return bytes;
        }
      } catch (error) {
        console.error("Handle save as base64 error:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      clearCanvas: () => setPaths([]),
      getPaths: () => paths,
      undo: handleUndo,
      saveAsBase64: handleSaveAsBase64,
    }));

    return (
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
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CanvasBoard;
