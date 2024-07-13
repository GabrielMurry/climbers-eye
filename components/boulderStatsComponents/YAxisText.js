import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

const YAxisText = ({
  x,
  y,
  text,
  selectedBar,
  BAR_WIDTH,
  TEXT_SIZE,
  CANVAS_PADDING_HOR,
  font,
  maxTextWidth,
}) => {
  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      return withTiming("#111111");
    } else if (selectedBar.value === null) {
      return withTiming("#111111");
    } else {
      return withTiming("#d1d0c5");
    }
  });
  // find font size and use that to get font width and subtract half of font width from x value to center each label
  const fontSize = font.measureText(text);
  const alignTextRight = maxTextWidth - fontSize.width;

  return (
    <Text
      font={font}
      x={x + CANVAS_PADDING_HOR + alignTextRight}
      y={y - fontSize.height / 2 + BAR_WIDTH}
      text={text}
      color={color}
    />
  );
};

export default YAxisText;
