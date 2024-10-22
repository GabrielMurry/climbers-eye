import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

const BarPathHorizontal = ({
  x,
  y,
  BAR_WIDTH,
  progress,
  label,
  selectedBar,
  maxTextWidth,
  LABEL_TO_BAR_PADDING,
  CANVAS_PADDING_HOR,
  BAR_CORNER_RADIUS,
}) => {
  const color = useDerivedValue(() => {
    if (selectedBar.value === label) {
      return withTiming("#ff6346");
    } else if (selectedBar.value === null) {
      return withTiming("#ff6346");
    } else {
      return withTiming("#d1d0c5");
    }
  });

  const path = useDerivedValue(() => {
    const barPath = Skia.Path.Make();
    barPath.addRRect({
      rect: {
        x: 0 + maxTextWidth + CANVAS_PADDING_HOR + LABEL_TO_BAR_PADDING,
        y: y ? y - BAR_WIDTH / 2 : 0,
        width: x * progress.value,
        height: BAR_WIDTH, // We can animate the height of the bar by multiplying it by the value of the progress
      },
      rx: BAR_CORNER_RADIUS,
      ry: BAR_CORNER_RADIUS,
    });

    return barPath;
  });

  return <Path path={path} color={color} />;
};

export default BarPathHorizontal;
