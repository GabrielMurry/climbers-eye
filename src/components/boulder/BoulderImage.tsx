import { Pressable, Dimensions } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { useModalFullScreenImage } from "../../contexts/ModalFullScreenImageContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BoulderImageProps = {
  spraywallUri: string;
  boulderUri: string;
  width: number;
  height: number;
  shrinkScale?: number;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const AnimatedImage = Animated.createAnimatedComponent(Image);

const BoulderImage: React.FC<BoulderImageProps> = ({
  spraywallUri,
  boulderUri,
  width,
  height,
  shrinkScale = 1,
}) => {
  const { openModal } = useModalFullScreenImage();

  const normalWidth = width * shrinkScale;
  const normalHeight = height * shrinkScale;
  const enlargedWidth = SCREEN_WIDTH;
  const enlargedHeight = height * (SCREEN_WIDTH / width);

  const animatedWidth = useSharedValue(normalWidth);
  const animatedHeight = useSharedValue(normalHeight);
  const isFullScreen = useSharedValue(false);

  //   const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       width: size.value,
  //       height: size.value,
  //     };
  //   });

  const handleIncreaseSize = () => {
    animatedWidth.value = withTiming(enlargedWidth, {
      duration: 250,
    });
    animatedHeight.value = withTiming(enlargedHeight, {
      duration: 250,
    });
  };

  const handleDecreaseSize = () => {
    animatedWidth.value = withTiming(normalWidth, {
      duration: 250,
    });
    animatedHeight.value = withTiming(normalHeight, {
      duration: 250,
    });
  };

  const toggleFullScreen = () => {
    if (isFullScreen.get()) {
      handleDecreaseSize();
    } else {
      //   openModal();
      handleIncreaseSize();
    }
    isFullScreen.value = !isFullScreen.value;
  };

  return (
    <Pressable onPress={toggleFullScreen}>
      <Animated.View
        style={{
          backgroundColor: "black",
          width: animatedWidth,
          height: animatedHeight,
        }}
      >
        <Image
          source={spraywallUri}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
          contentFit="contain"
        />
        <MaskedView
          style={{ position: "absolute", width: "100%", height: "100%" }}
          maskElement={
            <Image
              source={boulderUri}
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
              }}
              contentFit="contain"
            />
          }
        >
          <Image
            source={spraywallUri}
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
            }}
            contentFit="contain"
          />
        </MaskedView>
        <Image
          source={boulderUri}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            opacity: 0.5,
          }}
          contentFit="contain"
        />
      </Animated.View>
    </Pressable>
  );
};

export default BoulderImage;
