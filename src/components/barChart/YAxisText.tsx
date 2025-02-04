import React from "react";
import { SkFont, Text } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type YAxisTextProps = {
  x: number;
  y?: number;
  text: string;
  selectedBar: SharedValue<string | null>;
  BAR_WIDTH: number;
  CANVAS_PADDING_HOR: number;
  font: SkFont | null;
  maxTextWidth: number;
};

const YAxisText: React.FC<YAxisTextProps> = ({
  x,
  y,
  text,
  selectedBar,
  BAR_WIDTH,
  CANVAS_PADDING_HOR,
  font,
  maxTextWidth,
}) => {
  if (!font) return;

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
      y={y ? y - fontSize.height / 2 + BAR_WIDTH : undefined}
      text={text}
      color={color}
    />
  );
};

export default YAxisText;
