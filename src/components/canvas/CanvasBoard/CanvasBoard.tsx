import {
  Canvas,
  Circle,
  Group,
  ImageFormat,
  notifyChange,
  Path,
  Skia,
  SkPath,
  useCanvasRef,
} from "@shopify/react-native-skia";
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Image, useWindowDimensions, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { CanvasBoardProps, PathWithColorAndWidth, RefProps } from "./types";
import {
  runOnJS,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Point = {
  x: number;
  y: number;
};

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
    const cRef = useCanvasRef();

    const currentPath = useSharedValue(Skia.Path.Make());
    const smoothPath = useSharedValue(Skia.Path.Make());
    const startPoint = useSharedValue<Point>({ x: 0, y: 0 });
    const allPaths = useSharedValue<SkPath[]>([]);

    const gesture = Gesture.Pan()
      .averageTouches(true)
      .maxPointers(1)
      .onBegin((e) => {
        startPoint.value = { x: e.x, y: e.y };
        currentPath.value.moveTo(e.x, e.y);
        currentPath.value.lineTo(e.x, e.y);
        notifyChange(currentPath);
      })
      .onChange((e) => {
        currentPath.value.lineTo(e.x, e.y);
        notifyChange(currentPath);
      })
      .onEnd((e) => {
        // Post-process smoothing
        const startP = startPoint.get();
        currentPath.get().moveTo(startP.x, startP.y);
        smoothPath.get().moveTo(startP.x, startP.y);
        const pointsLength = currentPath.get().countPoints();
        const smooth = Skia.Path.Make();
        smooth.moveTo(startP.x, startP.y);
        for (let i = 1; i < pointsLength - 2; i++) {
          const p0 = currentPath.get().getPoint(i);
          const p1 = currentPath.get().getPoint(i + 1);
          const midX = (p0.x + p1.x) / 2;
          const midY = (p0.y + p1.y) / 2;

          smooth.quadTo(p0.x, p0.y, midX, midY);
        }
        allPaths.modify((value) => {
          "worklet";
          value.push(smooth);
          return value;
        });
        smoothPath.value.addPath(smooth);
        currentPath.value.reset();
        notifyChange(currentPath);
      })
      .onTouchesCancelled(() => {
        console.log("hi");
      });
    // .onTouchesUp(() => {

    // });

    const handleUndo = () => {
      smoothPath.value = smoothPath.value.reset();
      const length = allPaths.get().length;
      const newPath = Skia.Path.Make();
      for (let i = 0; i < length - 1; i++) {
        newPath.addPath(allPaths.value[i]);
      }
      allPaths.modify((value) => {
        "worklet";
        value.pop();
        return value;
      });
      smoothPath.value.addPath(newPath);
      notifyChange(smoothPath);
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
        const image = await cRef.current?.makeImageSnapshotAsync();
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
      clearCanvas: () => [],
      getPaths: () => [],
      undo: handleUndo,
      saveAsBase64: handleSaveAsBase64,
      saveAsLocalFile: handleSaveAsLocalFile,
    }));

    return (
      <GestureDetector gesture={gesture}>
        <Canvas ref={cRef} style={{ flex: 1 }}>
          <Path
            path={currentPath}
            color="green"
            style="stroke"
            strokeWidth={10}
            strokeCap="round"
          />
          <Path
            path={smoothPath}
            color="green"
            style="stroke"
            strokeWidth={10}
            strokeCap="round"
          />
        </Canvas>
      </GestureDetector>
    );
  }
);

export default CanvasBoard;
