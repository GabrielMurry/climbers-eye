import {
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const THEME_STYLE = "black";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHRINK_SCALE = 0.6;

const ImageDisplay = ({
  image,
  setImageFullScreen,
  // isLoading,
  // setIsLoading,
}) => {
  const [imageHeight, setImageHeight] = useState();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const scaledHeight = image.height * (SCREEN_WIDTH / image.width);
    // basically setting a maximum height requirement. If scaled height is above that req, then we shrink the image height some more
    if (scaledHeight < SCREEN_HEIGHT * 0.7) {
      setImageHeight(scaledHeight);
    } else {
      setImageHeight(SCREEN_HEIGHT * SHRINK_SCALE);
    }
  }, []);

  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isImageLoaded) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animation.stopAnimation();
    }
  }, [isImageLoaded]);

  return (
    <Pressable
      style={{
        width: SCREEN_WIDTH,
        height: imageHeight, // SCREEN_HEIGHT * 0.6 or image.height * (SCREEN_WIDTH / image.width)
        padding: 2,
      }}
      onPress={() => setImageFullScreen(true)}
    >
      {!isImageLoaded && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Image
            source={require("../../../assets/images/icon-transparent.png")}
            style={{
              width: "75%",
              height: "75%",
              transform: [{ scale: animation }],
            }}
            resizeMode="contain"
          />
        </View>
      )}
      <Image
        source={{
          uri: image.url,
        }}
        resizeMode="contain"
        // onLoadStart={() => setIsLoading(true)}
        // onLoadEnd={() => setIsLoading(false)}
        style={styles.image}
        onLoad={() => setIsImageLoaded(true)}
      />
    </Pressable>
  );
};

export default ImageDisplay;

const styles = StyleSheet.create({
  placeholder: {
    ...StyleSheet.absoluteFillObject, // Fills the container
    backgroundColor: "#ddd", // Background color for the placeholder
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
