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
const SHRINK_SCALE = 0.7;

const ImageDisplay = ({
  image,
  setImageFullScreen,
  isLoading,
  setIsLoading,
}) => {
  const [imageHeight, setImageHeight] = useState();

  useEffect(() => {
    if (SCREEN_HEIGHT * 0.7 > image.height * (SCREEN_WIDTH / image.width)) {
      setImageHeight(image.height * (SCREEN_WIDTH / image.width));
    } else {
      setImageHeight(SCREEN_HEIGHT * SHRINK_SCALE);
    }
  }, []);

  return (
    <Pressable
      style={{
        width: SCREEN_WIDTH,
        height: imageHeight, // SCREEN_HEIGHT * 0.6 or image.height * (SCREEN_WIDTH / image.width)
        paddingHorizontal: 5,
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
