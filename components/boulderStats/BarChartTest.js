import {
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Canvas, Group } from "@shopify/react-native-skia";
import * as d3 from "d3";
import BarPath from "./BarPath";
import XAxisText from "./XAxisText";
import AnimatedText from "./AnimatedText";
import { useSharedValue, withTiming } from "react-native-reanimated";

const data = [
  { label: "V4", value: 5796 },
  { label: "V5", value: 4036 },
  { label: "V6", value: 4897 },
  { label: "V7", value: 5455 },
  { label: "V8", value: 4811 },
  { label: "V9", value: 2113 },
  { label: "V10", value: 1675 },
  { label: "V11", value: 1675 },
];

const BarChartTest = ({ data: propData, isHorizontal = true }) => {
  // const data = propData.map((item) => ({
  //   label: item.x,
  //   value: item.y,
  // }));
  const { width } = useWindowDimensions();

  const progress = useSharedValue(0);
  const selectedValue = useSharedValue(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  // Creating a state to store the selected label
  const [selectedLabel, setSelectedLabel] = useState("Total");
  // Creating a sharedValue to store the selected label (bar)
  const selectedBar = useSharedValue(null);

  const canvasWidth = width;
  const canvasHeight = 350;

  const graphWidth = width - 20; // 20 comes from the screen's padding. graph does not center correctly if we do not account for (subtract) the padding from the graphWidth
  const graphMargin = 20;
  const graphHeight = canvasHeight - graphMargin;

  const barWidth = 28;

  const xRange = [0, graphWidth];
  const xDomain = data.map((dataPoint) => dataPoint.label);

  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  const yRange = [0, graphHeight];
  const yDomain = [0, d3.max(data, (yDataPoint) => yDataPoint.value)];

  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  // Using useEffect to change the value of progress to 1 with 'withTiming'.
  // Also to change the value of selectedValue to totalValue or total steps with 'withTiming'
  // So when the screen mounts, the animation bars will start and text will animate from 0 to total steps value
  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
    selectedValue.value = withTiming(totalValue, { duration: 1000 });
  }, [progress, selectedValue, totalValue]);

  const touchHandler = (e) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;
    const index = Math.floor((touchX - barWidth / 2) / x.step());
    // If our touch lands at the start of the first bar and within the end of the last bar
    if (index >= 0 && index < data.length) {
      const { label, value } = data[index];
      // If we touch inside the bar's boundary (x-axis only. Not doing y-axis at the moment)
      // Set the selected label to the bar's label that was pressed
      if (
        touchX > x(label) - barWidth / 2 &&
        touchX < x(label) + barWidth / 2
      ) {
        setSelectedLabel(label);
        selectedBar.value = label;
        selectedValue.value = withTiming(value);
      }
      // If no bar is pressed, reset selectedLabel to be total boulders climbed
      else {
        setSelectedLabel("Total");
        selectedBar.value = null;
        selectedValue.value = withTiming(totalValue);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        {/* <Text style={styles.textTitle}>Logbook</Text> */}
        <Text style={styles.textSteps}>{selectedLabel} Boulders Climbed</Text>
        <AnimatedText selectedValue={selectedValue} />
      </View>
      <Canvas
        onTouchStart={touchHandler}
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
      >
        {data.map((dataPoint, index) => (
          <Group key={index}>
            <BarPath
              x={x(dataPoint.label)}
              y={y(dataPoint.value)}
              barWidth={barWidth}
              graphHeight={graphHeight}
              progress={progress}
              label={dataPoint.label}
              selectedBar={selectedBar}
            />
            <XAxisText
              x={x(dataPoint.label)}
              y={canvasHeight}
              text={dataPoint.label}
              selectedBar={selectedBar}
            />
          </Group>
        ))}
      </Canvas>
    </SafeAreaView>
  );
};

export default BarChartTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebecde",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  textTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 38,
    color: "black",
  },
  textSteps: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    color: "black",
  },
});
