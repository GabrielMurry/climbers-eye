import {
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

const ImageDisplay = ({
  image,
  setImageFullScreen,
  isLoading,
  setIsLoading,
}) => {
  const imageScaleDownFactor = image.width > image.height ? 10 : 9;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.imageContainer(image, imageScaleDownFactor)}
        onPress={() => setImageFullScreen(true)}
      >
        <Image
          source={{
            uri: image.url,
          }}
          resizeMode="contain"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          style={styles.image}
        />
        {isLoading && (
          <ActivityIndicator
            size="large"
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
        )}
      </Pressable>
    </View>
  );
};

export default ImageDisplay;

const styles = StyleSheet.create({
  container: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: (image, imageScaleDownFactor) => ({
    width: image.width / (imageScaleDownFactor + 0.5),
    height: image.height / (imageScaleDownFactor + 0.5),
  }),
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
