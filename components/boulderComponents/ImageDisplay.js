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
        style={styles.imageButton(image, imageScaleDownFactor)}
        onPress={() => setImageFullScreen(true)}
      >
        <View style={styles.imageContainer(image, imageScaleDownFactor)}>
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
        </View>
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
  imageButton: (image, imageScaleDownFactor) => ({
    minHeight: 425,
    minWidth: "95%",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FFFBF1",
    justifyContent: "center",
    alignItems: "center",
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
    // adding shadow to image
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  }),
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
