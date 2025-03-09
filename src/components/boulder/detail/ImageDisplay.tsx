import { Pressable, Dimensions, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageObjUrl } from "../../../utils/types/image";
import { useModalFullScreenImage } from "../../../contexts/ModalFullScreenImageContext";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";

type ImageDisplayProps = {
  image: ImageObjUrl;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHRINK_SCALE = 0.6;

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image }) => {
  const { openModal } = useModalFullScreenImage();
  const [imageHeight, setImageHeight] = useState(0);

  // const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const scaledHeight = image.height * (SCREEN_WIDTH / image.width);
    // basically setting a maximum height requirement. If scaled height is above that req, then we shrink the image height some more
    if (scaledHeight < SCREEN_HEIGHT * 0.7) {
      setImageHeight(scaledHeight);
    } else {
      setImageHeight(SCREEN_HEIGHT * SHRINK_SCALE);
    }
  }, []);

  // const animation = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   if (!isImageLoaded) {
  //     Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(animation, {
  //           toValue: 1.1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(animation, {
  //           toValue: 1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ])
  //     ).start();
  //   } else {
  //     animation.stopAnimation();
  //   }
  // }, [isImageLoaded]);

  const imageElement = (
    <>
      <Image
        source={require("../../../../images/photo.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
        contentFit="contain"
      />
      <MaskedView
        style={{ position: "absolute", width: "100%", height: "100%" }}
        maskElement={
          <Image
            source={require("../../../../images/test1.png")}
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
            }}
            contentFit="contain"
          />
        }
      >
        <Image
          source={require("../../../../images/photo.jpg")}
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
          }}
          contentFit="contain"
        />
      </MaskedView>
      <Image
        source={require("../../../../images/test1.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.5,
        }}
        contentFit="contain"
      />
    </>
  );

  return (
    <Pressable
      style={{
        width: SCREEN_WIDTH,
        // height: imageHeight, //  SCREEN_HEIGHT * 0.6 or image.height * (SCREEN_WIDTH / image.width)
        height: imageHeight,
        backgroundColor: "black",
      }}
    >
      {imageElement}
    </Pressable>
  );
};

export default ImageDisplay;
