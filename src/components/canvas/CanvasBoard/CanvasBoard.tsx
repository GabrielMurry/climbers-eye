import {
  Canvas,
  Path,
  Skia,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { CanvasBoardProps, PathWithColorAndWidth } from "./types";

const CanvasBoard: React.FC<CanvasBoardProps> = forwardRef(
  (
    {
      width = useWindowDimensions().width,
      height = useWindowDimensions().height,
      disableBrush = false,
      color,
      strokeWidth,
      opacity,
    },
    ref
  ) => {
    const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);

    const onDrawingStart = useCallback(
      (touchInfo: TouchInfo) => {
        setPaths((currentPaths) => {
          const { x, y } = touchInfo;
          const newPath = Skia.Path.Make();
          newPath.moveTo(x, y);
          return [
            ...currentPaths,
            {
              path: newPath,
              color,
              strokeWidth,
            },
          ];
        });
      },
      [color, strokeWidth]
    );

    const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
      setPaths((currentPaths) => {
        const { x, y } = touchInfo;
        const currentPath = currentPaths[currentPaths.length - 1];
        const lastPoint = currentPath.path.getLastPt();
        const xMid = (lastPoint.x + x) / 2;
        const yMid = (lastPoint.y + y) / 2;
        // quadTo adds a smooth quadratic Bezier curve to the current path between the last point and a new point, making the drawing curve nicely and look smoother/natural rather than having a bunch of straight jagged lines.
        currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
        return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
      });
    }, []);

    const touchHandler = useTouchHandler(
      {
        onActive: onDrawingActive,
        onStart: onDrawingStart,
      },
      [onDrawingActive, onDrawingStart]
    );

    // Modified touchHandler to account for disableBrush
    const handleTouch = (event: any) => {
      // Do nothing if the brush is disabled. Ensuring touch or strokes are not queued up even when brush is disabled.
      if (disableBrush) {
        return;
      }
      // Call touchHandler when brush is enabled
      touchHandler(event);
    };

    const handleUndo = () => {
      setPaths((currentPaths) => {
        if (currentPaths.length === 0) return currentPaths;
        return currentPaths.slice(0, -1); // Remove the last stroke
      });
    };

    // Use useImperativeHandle to expose custom methods or values to the parent component
    useImperativeHandle(ref, () => ({
      clearCanvas: () => setPaths([]),
      getPaths: () => paths,
      undo: handleUndo,
    }));

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <ToolBar
        color={color}
        strokeWidth={strokeWidth}
        setColor={setColor}
        strokes={strokes}
        setStrokeWidth={setStrokeWidth}
      /> */}
        <Canvas style={{ width: width, height: height }} onTouch={handleTouch}>
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
      </SafeAreaView>
    );
  }
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CanvasBoard;
