import {
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../general/Header";

const THEME_STYLE = "black";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHRINK_SCALE = 0.6;

const ImageDisplay = ({
  image,
  setImageFullScreen,
  isLoading,
  setIsLoading,
}) => {
  const [imageHeight, setImageHeight] = useState();

  useEffect(() => {
    const scaledHeight = image.height * (SCREEN_WIDTH / image.width);
    // basically setting a maximum height requirement. If scaled height is above that req, then we shrink the image height some more
    if (scaledHeight < SCREEN_HEIGHT * 0.7) {
      setImageHeight(scaledHeight);
    } else {
      setImageHeight(SCREEN_HEIGHT * SHRINK_SCALE);
    }
  }, []);

  return (
    <Pressable
      style={{
        width: SCREEN_WIDTH,
        height: imageHeight, // SCREEN_HEIGHT * 0.6 or image.height * (SCREEN_WIDTH / image.width)
        padding: 2,
      }}
      onPress={() => setImageFullScreen(true)}
    >
      <Image
        source={{
          uri: image.url,
        }}
        resizeMode="contain"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Pressable>
  );
};

export default ImageDisplay;
