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
import AnimatedText from "./AnimatedText";
import { useSharedValue, withTiming } from "react-native-reanimated";
import BarPathHorizontal from "./BarPathHorizontal";
import YAxisText from "./YAxisText";
import { useFonts } from "../../contexts/FontContext";

const BarChartHorizontal = ({
  data,
  canvasWidth = null,
  canvasHeight = null,
  labelToBarPadding = null,
  canvasPaddingHorizontal = null,
  screenPadding = null,
  barWidth = null,
  barCornerRadius = null,
  displayHeader = true,
}) => {
  const { width } = useWindowDimensions();

  const maxDataValue = Math.max(...data.map((item) => item.value));

  const TEXT_SIZE = 12;

  const { fonts, fontsLoaded } = useFonts();

  if (!fontsLoaded) {
    console.log("Inter font not loaded for horizontal bar chart.");
  }

  const font = fonts.inter12;
  const fontTotal = fonts.inter88;

  let maxTextWidth = 0;
  if (font) {
    maxTextWidth = data.reduce((max, item) => {
      const { width } = font.measureText(item.label);
      return width > max ? width : max;
    }, 0);
  }

  // USER CAN CHANGE THESE VALUES (CAPITAL LETTERS)
  const CANVAS_WIDTH = canvasWidth || width;
  const CANVAS_HEIGHT = canvasHeight || 440;
  const LABEL_TO_BAR_PADDING = labelToBarPadding || 2;
  const CANVAS_PADDING_HOR = canvasPaddingHorizontal || 10;
  const SCREEN_PADDING = screenPadding || 20;
  const GRAPH_WIDTH =
    CANVAS_WIDTH -
    SCREEN_PADDING -
    maxTextWidth -
    LABEL_TO_BAR_PADDING -
    CANVAS_PADDING_HOR * 2; // Width of graph bars section. 20 comes from the screen's padding. graph does not center correctly if we do not account for (subtract) the padding from the GRAPH_WIDTH
  const GRAPH_HEIGHT = CANVAS_HEIGHT;
  const BAR_WIDTH = barWidth || 12;
  const BAR_CORNER_RADIUS = barCornerRadius || 3;
  const DISPLAY_HEADER = displayHeader;

  const [startTouchPosition, setStartTouchPosition] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const progress = useSharedValue(0);
  const selectedValue = useSharedValue(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  // Creating a state to store the selected label
  const [selectedLabel, setSelectedLabel] = useState("Total");
  // Creating a sharedValue to store the selected label (bar)
  const selectedBar = useSharedValue(null);

  const xRange = [0, GRAPH_WIDTH];
  // Set x domain depending on whether all values are zero
  const xDomain = maxDataValue > 0 ? [0, maxDataValue] : [0, 1];

  const yRange = [0, GRAPH_HEIGHT];
  const yDomain = data.map((dataPoint) => dataPoint.label);

  const x = d3.scaleLinear().domain(xDomain).range(xRange);

  const y = d3.scalePoint().domain(yDomain).range(yRange).padding(1);
  // Using useEffect to change the value of progress to 1 with 'withTiming'.
  // Also to change the value of selectedValue to totalValue or total steps with 'withTiming'
  // So when the screen mounts, the animation bars will start and text will animate from 0 to total steps value
  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
    selectedValue.value = withTiming(totalValue, { duration: 1000 });
  }, [progress, selectedValue, totalValue]);

  const onTouchPress = (touchX, touchY) => {
    const index = Math.floor((touchY - BAR_WIDTH / 2) / y.step());
    // If our touch lands at the start of the first bar and within the end of the last bar
    if (index >= 0 && index < data.length) {
      const { label, value } = data[index];
      setSelectedLabel(label);
      selectedBar.value = label;
      selectedValue.value = withTiming(value);
    }
  };

  const handleTouchStart = (e) => {
    // Store the start position of the touch
    const { locationX, locationY } = e.nativeEvent;
    setStartTouchPosition({ x: locationX, y: locationY });
    setIsScrolling(false); // Reset scrolling state on new touch
  };

  const handleTouchMove = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    if (startTouchPosition) {
      // Calculate the distance moved
      const distance = Math.sqrt(
        Math.pow(locationX - startTouchPosition.x, 2) +
          Math.pow(locationY - startTouchPosition.y, 2)
      );
      // Determine if the touch move is significant enough to be considered a scroll
      if (distance > 10) {
        // Threshold in pixels for scrolling
        setIsScrolling(true);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (!isScrolling) {
      // Handle touch as a press if it wasn't a scroll
      onTouchPress(e.nativeEvent.locationX, e.nativeEvent.locationY);
    }
    setStartTouchPosition(null); // Reset touch position
    setIsScrolling(false); // Reset scrolling state
  };

  const handleResetBarInfo = () => {
    setSelectedLabel("Total");
    selectedBar.value = null;
    selectedValue.value = withTiming(totalValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      {DISPLAY_HEADER ? (
        <View onTouchStart={handleResetBarInfo} style={styles.textContainer}>
          {/* <Text style={styles.textTitle}>Logbook</Text> */}
          <Text style={styles.textSteps}>{selectedLabel} Boulders Climbed</Text>
          <AnimatedText selectedValue={selectedValue} fontTotal={fontTotal} />
        </View>
      ) : null}
      <Canvas
        // We want to confirm if it is a touch or a scroll. If user is scrolling, don't confirm the touch
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
        }}
      >
        {data.map((dataPoint, index) => (
          <Group key={index}>
            <BarPathHorizontal
              x={x(dataPoint.value)}
              y={y(dataPoint.label)}
              BAR_WIDTH={BAR_WIDTH}
              progress={progress}
              label={dataPoint.label}
              selectedBar={selectedBar}
              maxTextWidth={maxTextWidth}
              LABEL_TO_BAR_PADDING={LABEL_TO_BAR_PADDING}
              CANVAS_PADDING_HOR={CANVAS_PADDING_HOR}
              BAR_CORNER_RADIUS={BAR_CORNER_RADIUS}
            />
            <YAxisText
              x={0}
              y={y(dataPoint.label)}
              text={dataPoint.label}
              selectedBar={selectedBar}
              BAR_WIDTH={BAR_WIDTH}
              TEXT_SIZE={TEXT_SIZE}
              CANVAS_PADDING_HOR={CANVAS_PADDING_HOR}
              font={font}
              maxTextWidth={maxTextWidth}
            />
          </Group>
        ))}
      </Canvas>
    </SafeAreaView>
  );
};

export default BarChartHorizontal;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 28,
    color: "black",
  },
});
