import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export function scaledImageWidth() {
  return width;
}

export function scaledImageHeight(imageHeight, imageWidth) {
  const aspectRatio = imageHeight / imageWidth;
  return width * aspectRatio;
}
