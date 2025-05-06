import { Pressable, Dimensions, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
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
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const prefetchImage = async (url: string) => {
  try {
    await Image.prefetch(url);
    console.log(`Image prefetched successfully: ${url}`);
  } catch (error) {
    console.error(`Error prefetching image: ${url}`, error);
  }
};

const BoulderImage: React.FC<BoulderImageProps> = ({
  spraywallUri,
  boulderUri,
  width,
  height,
}) => {
  const navigation = useNavigation();

  const [ready, setReady] = useState(false);
  const [boulderReady, setBoulderReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [displayedSize, setDisplayedSize] = useState({ width: 0, height: 0 });

  const boulderOpacity = useSharedValue(0);
  const spraywallOpacity = useSharedValue(1);

  useEffect(() => {
    if (ready && boulderReady) {
      spraywallOpacity.value = withTiming(0.75, { duration: 1000 });
      boulderOpacity.value = withTiming(0.5, { duration: 1000 });
    }
  }, [ready, boulderReady]);

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
  }, [boulderUri]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BoulderImageFull", {
          boulderUri,
          spraywallUri,
          width: SCREEN_WIDTH,
          height: height * (SCREEN_WIDTH / width),
        })
      }
      style={{
        height: 500,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {ready && (
        <View
          style={{
            width: Math.round(displayedSize.width),
            height: Math.round(displayedSize.height),
            backgroundColor: "black",
          }}
        />
      )}
      <Animated.View
        style={[
          {
            width: SCREEN_WIDTH,
            height: 500,
            position: "absolute",
            opacity: spraywallOpacity,
          },
        ]}
      >
        <Image
          source={spraywallUri}
          style={{
            width: SCREEN_WIDTH,
            height: 500,
          }}
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContainerSize({ width, height });
          }}
          contentFit="contain"
          onLoad={() => setReady(true)}
        />
      </Animated.View>
      {ready && boulderReady && (
        <Animated.View
          style={[
            {
              position: "absolute",
              width: SCREEN_WIDTH,
              height: 500,
              backgroundColor: "transparent",
            },
          ]}
        >
          <MaskedView
            style={{
              position: "absolute",
              width: SCREEN_WIDTH,
              height: 500,
            }}
            maskElement={
              <Image
                source={boulderUri}
                style={{
                  width: SCREEN_WIDTH,
                  height: 500,
                  opacity: 1,
                }}
                contentFit="contain"
                cachePolicy={"memory-disk"}
              />
            }
          >
            <Image
              source={spraywallUri}
              style={{
                width: SCREEN_WIDTH,
                height: 500,
                opacity: 1,
              }}
              contentFit="contain"
              cachePolicy={"memory-disk"}
            />
          </MaskedView>
        </Animated.View>
      )}
      {ready && (
        <Animated.View
          style={{
            position: "absolute",
            width: SCREEN_WIDTH,
            height: 500,
            backgroundColor: "transparent",
            opacity: boulderOpacity,
          }}
        >
          <Image
            source={boulderUri}
            style={{
              width: SCREEN_WIDTH,
              height: 500,
            }}
            contentFit="contain"
            onLoad={() => setBoulderReady(true)}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

export default BoulderImage;
