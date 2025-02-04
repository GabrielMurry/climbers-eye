import React from "react";
import { Canvas, SkFont, Text } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

type AnimatedTextProps = {
  selectedValue: SharedValue<number>;
  fontTotal: SkFont | null;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  selectedValue,
  fontTotal,
}) => {
  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  // const fontSize = fontTotal!.measureText("0");
  const fontSize = { height: 50 };

  const VERT_PADDING = 20;

  return (
    <Canvas style={{ height: fontSize.height + VERT_PADDING }}>
      <Text
        text={animatedText}
        font={fontTotal}
        color={"black"}
        y={fontSize.height + VERT_PADDING / 2}
      />
    </Canvas>
  );
};

export default AnimatedText;
