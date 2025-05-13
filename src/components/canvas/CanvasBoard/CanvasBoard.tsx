import {
  Canvas,
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
import { Image, useWindowDimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { CanvasBoardProps, PathObj, Point, RefProps } from "./types";
import { runOnJS, useSharedValue } from "react-native-reanimated";
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
    },
    ref: Ref<RefProps>
  ) => {
    const cRef = useCanvasRef();
    const cRefColorMask = useCanvasRef();

    const startPoint = useSharedValue<Point>({ x: 0, y: 0 });
    // Current path when drawing is handled on UI thread for performance
    const currentPath = useSharedValue(Skia.Path.Make());
    const [allPaths, setAllPaths] = useState<PathObj[]>([
      { path: Skia.Path.Make(), color: color, strokeWidth: strokeWidth },
    ]);

    useEffect(() => {
      // We want pathState to update first, then reset the currentPath shared value.
      // This prevents flickering
      currentPath.value.reset();
    }, [allPaths]);

    const updateState = (path: SkPath) => {
      setAllPaths((prev) => [
        ...prev,
        { path: path, color: color, strokeWidth: strokeWidth },
      ]);
    };

    const gesture = Gesture.Pan()
      .enabled(enabled)
      .averageTouches(true)
      .maxPointers(1)
      .onBegin((e) => {
        // When user first presses down on screen - make a dot and get that start point
        startPoint.value = { x: e.x, y: e.y };
        currentPath.value.moveTo(e.x, e.y);
        currentPath.value.lineTo(e.x, e.y);
        notifyChange(currentPath);
      })
      .onChange((e) => {
        // Drawing
        currentPath.value.lineTo(e.x, e.y);
        notifyChange(currentPath);
      })
      .onFinalize(() => {
        const pointsLength = currentPath.get().countPoints();
        const startP = startPoint.get();
        // Make a separate Skia Path and move it to start point
        const smooth = Skia.Path.Make();
        smooth.moveTo(startP.x, startP.y);
        if (pointsLength > 2) {
          // Post-process smoothing
          for (let i = 1; i < pointsLength - 2; i++) {
            const p0 = currentPath.get().getPoint(i);
            const p1 = currentPath.get().getPoint(i + 1);
            const midX = (p0.x + p1.x) / 2;
            const midY = (p0.y + p1.y) / 2;

            smooth.quadTo(p0.x, p0.y, midX, midY);
          }
        } else {
          // User just tapped screen (drew a dot)
          smooth.lineTo(startP.x, startP.y);
        }
        runOnJS(updateState)(smooth);
        notifyChange(currentPath);
      });

    const handleUndo = () => {
      setAllPaths((prev) => prev.slice(0, -1));
    };

    const handleSaveDrawingLocally = async () => {
      try {
        // Taking snapshot of the hidden canvas drawing since we need the drawing completely visible / opaque
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
      clearCanvas: () => [],
      getPaths: () => [],
      undo: handleUndo,
      saveDrawingLocally: handleSaveDrawingLocally,
    }));

    return (
      <>
        <GestureDetector gesture={gesture}>
          <Canvas ref={cRef} style={{ width: width, height }}>
            {allPaths.map((data, index) => (
              <Path
                key={index}
                path={data.path}
                color={data.color}
                style="stroke"
                strokeWidth={data.strokeWidth}
                strokeCap="round"
                opacity={0.5}
              />
            ))}
            <Path
              path={currentPath}
              color={color}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              opacity={0.5}
            />
          </Canvas>
        </GestureDetector>
        {/* Hidden canvas for taking snapshot since we need the drawing to be fully opaque */}
        <Canvas
          ref={cRefColorMask}
          style={{ width, height, position: "absolute", left: -9999 }}
        >
          {allPaths.map((data, index) => (
            <Path
              key={index}
              path={data.path}
              color={data.color}
              style={"stroke"}
              strokeWidth={data.strokeWidth}
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
