import { Pressable, Dimensions, View, StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image, ImageBackground } from "expo-image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BoulderImageProps = {
  spraywallUri: string;
  boulderUri: string;
  width: number;
  height: number;
  boulderOpacity: SharedValue<number>;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const prefetchImage = async (url: string) => {
  try {
    await Image.prefetch(url);
  } catch (error) {
    console.error(`Error prefetching image: ${url}`, error);
  }
};

type Size = {
  width: number;
  height: number;
};

const ANIM_DURATION = 750;

const BoulderImage: React.FC<BoulderImageProps> = ({
  spraywallUri,
  boulderUri,
  width,
  height,
  boulderOpacity,
}) => {
  const [isSpraywallLoaded, setIsSpraywallLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [displayedSize, setDisplayedSize] = useState<Size | null>(null);
  const [mountMask, setMountMask] = useState(false);

  // const boulderOpacity = useSharedValue(0);
  const spraywallOpacity = useSharedValue(1);
  const maskOpacity = useSharedValue(0);

  useEffect(() => {
    if (displayedSize) {
      spraywallOpacity.value = withTiming(0.75, { duration: ANIM_DURATION });
      // boulderOpacity.value = withTiming(0.5, { duration: ANIM_DURATION });
      const timerId = setTimeout(() => {
        setMountMask(true);
        maskOpacity.value = withTiming(1, { duration: ANIM_DURATION });
      }, 750);

      return () => clearTimeout(timerId);
    }
  }, [displayedSize]);

  useEffect(() => {
    if (containerSize.width && containerSize.height && width && height) {
      const containerAspect = containerSize.width / containerSize.height;
      const imageAspect = width / height;

      let scaledWidth, scaledHeight;

      if (imageAspect > containerAspect) {
        // Image is wider than container
        scaledWidth = containerSize.width;
        scaledHeight = containerSize.width / imageAspect;
      } else {
        // Image is taller than container
        scaledHeight = containerSize.height;
        scaledWidth = containerSize.height * imageAspect;
      }

      setDisplayedSize({ width: scaledWidth, height: scaledHeight });
    }
  }, [containerSize, width, height]);

  useEffect(() => {
    prefetchImage(boulderUri);
    prefetchImage(spraywallUri);
  }, [boulderUri]);

  return (
    <View
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Animated.View style={{ width: "100%", opacity: spraywallOpacity }}>
        <Image
          source={spraywallUri}
          style={{
            width: "100%",
            height: "100%",
          }}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContainerSize({ width, height });
          }}
          contentFit="contain"
          onLoad={() => setIsSpraywallLoaded(true)}
        />
      </Animated.View>
      {displayedSize && (
        <>
          <View
            style={{
              width: Math.round(displayedSize.width),
              height: Math.round(displayedSize.height),
              backgroundColor: "black",
              position: "absolute",
              zIndex: -1,
            }}
          />
          {mountMask && (
            <Animated.View
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                opacity: maskOpacity,
                width: Math.round(displayedSize.width),
                height: Math.round(displayedSize.height),
              }}
            >
              <MaskedView
                maskElement={
                  <Image
                    source={boulderUri}
                    style={{
                      width: "100%",
                      height: "100%",
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
                  }}
                  contentFit="contain"
                />
              </MaskedView>
            </Animated.View>
          )}
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              opacity: boulderOpacity,
              width: Math.round(displayedSize.width),
              height: Math.round(displayedSize.height),
            }}
          >
            <Image
              source={boulderUri}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default BoulderImage;
