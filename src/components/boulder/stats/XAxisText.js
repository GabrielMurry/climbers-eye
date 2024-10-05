import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import inter from "../../assets/fonts/Inter-Font.ttf";
import { useDerivedValue, withTiming } from "react-native-reanimated";

const XAxisText = ({ x, y, text, selectedBar }) => {
  const font = useFont(inter, 18);

  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      return withTiming("#111111");
    } else if (selectedBar.value === null) {
      return withTiming("#111111");
    } else {
      return withTiming("#d1d0c5");
    }
  });

  if (!font) {
    return null;
  }
  // find font size and use that to get font width and subtract half of font width from x value to center each label
  const fontSize = font.measureText(text);

  return (
    <Text
      font={font}
      x={x - fontSize.width / 2}
      y={y}
      text={text}
      color={color}
    />
  );
};

export default XAxisText;
