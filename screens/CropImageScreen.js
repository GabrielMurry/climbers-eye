import React, { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const CropImageScreen = ({ route, navigation }) => {
  const { imageUri, type, orientation, scale, width, height, cropDimensions } =
    route.params;
  const [imageCoordinates, setImageCoordinates] = useState({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setImageCoordinates({
          x:
            type === "headshot" && orientation === "horizontal"
              ? gestureState.moveX - gestureState.x0
              : imageCoordinates.x,
          y:
            type === "banner" ||
            (type === "headshot" && orientation === "vertical")
              ? gestureState.moveY - gestureState.y0
              : imageCoordinates.y,
        });
      },
    })
  ).current;

  const handleDone = async () => {
    console.log(
      (width - cropDimensions.width * scale) / 2 - imageCoordinates.x * scale
    );
    const cropData = {
      originX:
        (width - cropDimensions.width * scale) / 2 - imageCoordinates.x * scale, // X-coordinate of the top-left corner of the crop area
      originY:
        (height - cropDimensions.height * scale) / 2 -
        imageCoordinates.y * scale, // Y-coordinate of the top-left corner of the crop area
      width: width, // Width of the crop area
      height: cropDimensions.height * scale, // Height of the crop area
    };
    const manipResult = await manipulateAsync(imageUri, [{ crop: cropData }], {
      compress: 1,
      format: SaveFormat.PNG,
      base64: true,
    });
    if (type === "headshot") {
      navigation.navigate("Profile", {
        profileImageUri: manipResult.base64,
        profileImageWidth: width,
        profileImageHeight: height,
      });
    } else if (type === "banner") {
      navigation.navigate("Profile", {
        profileBannerUri: manipResult.base64,
        profileBannerWidth: width,
        profileBannerHeight: height,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 2,
          borderColor: "red",
          width: cropDimensions.width,
          height: cropDimensions.height,
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: type === "headshot" ? cropDimensions.width / 2 : 0,
        }}
      />
      <Image
        source={{ uri: imageUri }}
        style={{
          width: width / scale,
          height: height / scale,
          left: imageCoordinates.x,
          top: imageCoordinates.y,
        }}
        resizeMode="contain"
        {...panResponder.panHandlers}
      />
      <TouchableOpacity
        onPress={handleDone}
        style={{ position: "absolute", bottom: 0, marginBottom: 25 }}
      >
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cropOverlay: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
  },
});

export default CropImageScreen;
