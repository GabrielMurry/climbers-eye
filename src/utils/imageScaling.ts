import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export function scaledImageWidth() {
  return width;
}

export function scaledImageHeight(imageHeight: number, imageWidth: number) {
  const aspectRatio = imageHeight / imageWidth;
  return width * aspectRatio;
}
