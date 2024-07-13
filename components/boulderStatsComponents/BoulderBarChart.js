import { View, Dimensions } from "react-native";
import React from "react";
import {
  Canvas,
  useFont,
  Circle,
  Group,
  Rect,
  RoundedRect,
  Skia,
  Path,
  Text,
} from "@shopify/react-native-skia";
import inter from "../../assets/fonts/Inter-Font.ttf";

const GRAPH_MARGIN = 20;
const GRAPH_PADDING = 20;
const GRAPH_BAR_WIDTH = 10;
const TEXT_PADDING = 5;
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = CANVAS_WIDTH;
const GRAPH_HEIGHT = CANVAS_HEIGHT - 2 * GRAPH_MARGIN;
const GRAPH_WIDTH = CANVAS_WIDTH;

const BoulderBarChart = () => {
  const font = useFont(inter, 12);

  if (!font) {
    return <View />;
  }

  const testData = [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 1 },
    { label: "Mar", value: 2 },
    { label: "Apr", value: 1 },
    { label: "May", value: 1 },
    { label: "Jun", value: 1 },
    { label: "Jul", value: 1 },
    { label: "Aug", value: 1 },
    { label: "Sep", value: 1 },
    { label: "Oct", value: 1 },
    { label: "Nov", value: 1 },
    { label: "Dec", value: 1 },
  ];
  // Calculate the maximum value in the dataset
  const maxValue = Math.max(...testData.map((data) => data.value));
  // Calculate the scaling factor
  const scaleFactor = GRAPH_HEIGHT / maxValue;
  // Building the bar paths for bar chart
  let newPath = Skia.Path.Make();
  // Calculate the number of gaps and total space for gaps
  const numBars = testData.length;
  const totalBarSpace = numBars * GRAPH_BAR_WIDTH + GRAPH_PADDING * 2;
  const totalGapSpace = CANVAS_WIDTH - totalBarSpace;
  const spaceBetweenBars = totalGapSpace / (numBars - 1) + GRAPH_BAR_WIDTH;

  testData.forEach(function (dataPoint, i) {
    const scaledHeight = dataPoint.value * scaleFactor;
    const xPosition = i * spaceBetweenBars + GRAPH_PADDING;
    const rect = Skia.XYWHRect(
      xPosition,
      CANVAS_HEIGHT - scaledHeight - GRAPH_MARGIN,
      GRAPH_BAR_WIDTH,
      scaledHeight
    );
    newPath.addRect(rect);
  });

  newPath.close();

  return (
    <Canvas
      style={{
        flex: 1,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: "red",
      }}
    >
      {testData.map((dataPoint, i) => {
        const scaledHeight = dataPoint.value * scaleFactor;
        const xPosition = i * spaceBetweenBars + GRAPH_PADDING;
        return (
          <Text
            key={dataPoint.label}
            font={font}
            x={xPosition + 1} // Adjust the x by subtracting font size / 4
            y={CANVAS_HEIGHT - scaledHeight - GRAPH_MARGIN - TEXT_PADDING}
            text={dataPoint.value.toString()}
          />
        );
      })}
      <Path path={newPath} color="lightblue" />
      {testData.map((dataPoint, i) => {
        const scaledHeight = dataPoint.value * scaleFactor;
        const xPosition = i * spaceBetweenBars + GRAPH_PADDING;
        const fontSize = font.measureText(dataPoint.label);
        return (
          <Text
            key={dataPoint.label}
            font={font}
            x={xPosition - fontSize.width / 2} // Adjust the x by subtracting font size / 4
            y={CANVAS_HEIGHT - TEXT_PADDING}
            text={dataPoint.label}
          />
        );
      })}
    </Canvas>
  );
};

export default BoulderBarChart;
