import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";

const PreviewImage = ({
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SHRINK_SCALE,
  setImageFullScreen,
  resultImageUri,
  isImageLoading,
  setIsImageLoading,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * SHRINK_SCALE },
      ]}
      onPress={() => setImageFullScreen(true)}
    >
      <Image
        source={{ uri: resultImageUri }}
        style={styles.image}
        resizeMode="contain"
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
      />
      {isImageLoading ?? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      )}
    </Pressable>
  );
};

export default PreviewImage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadingIndicator: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
