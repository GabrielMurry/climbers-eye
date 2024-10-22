import React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

const BarPath = ({
  x,
  y,
  barWidth,
  graphHeight,
  progress,
  label,
  selectedBar,
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
        x: x ? x - barWidth / 2 : 0, // check if x has value, if undefined or null return 0. Centering chart we subtract half of the barWidth from the x value
        y: graphHeight,
        width: barWidth,
        height: y * -1 * progress.value, // We can animate the height of the bar by multiplying it by the value of the progress
      },
      rx: 8,
      ry: 8,
    });

    return barPath;
  });

  return <Path path={path} color={color} />;
};

export default BarPath;
