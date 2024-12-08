import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { colors } from "../../utils/styles";
import { useFetch } from "../../hooks/useFetch";
import { updateProfileInfo } from "../../services/profile";
import { updateUser } from "../../redux/features/user/userSlice";
import LoadingFadeOverlay from "../../components/common/LoadingFadeOverlay";
import { ImageManipulator } from "expo-image-manipulator";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CropImageScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { imageUri, width, height, isPortrait } = route.params;

  const [contentHeight, setContentHeight] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const zoomRef = useRef();

  const [patchProfile, isLoadingPatchProfile, isErrorPatchProfile] =
    useFetch(updateProfileInfo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Crop Image
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleDonePress} disabled={isLoading}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isLoading]);

  const handleDonePress = async () => {
    setIsLoading(true);
    // wow!
    // transform info
    const cropScale = width / SCREEN_WIDTH;

    const a = SCREEN_WIDTH / zoomRef.current.zoomLevel;
    const b = SCREEN_WIDTH - a;
    const c = b / 2;
    let newX = c - zoomRef.current.offsetX;
    newX = newX * cropScale;
    let newY = c - zoomRef.current.offsetY;
    newY = (height - width) / 2 + newY * cropScale;

    const cropWidth = width / zoomRef.current.zoomLevel;
    const cropHeight = cropWidth; // square crop - same dimensions

    cropData = {
      originX: newX,
      originY: newY,
      width: cropWidth,
      height: cropHeight,
    };
    const croppedImage = await ImageManipulator.manipulate(imageUri)
      .crop(cropData)
      .renderAsync();
    const formattedImage = await croppedImage.saveAsync({
      compress: 0.5,
    });
    const formData = new FormData();
    formData.append("profilePicUrl", {
      uri: formattedImage.uri,
      name: "photo.jpeg",
      type: "image/jpeg",
    });
    formData.append("profilePicWidth", width); // square crop - same dimensions - based on image width
    formData.append("profilePicHeight", width);
    const response = await patchProfile({ data: formData });
    dispatch(updateUser(response.data));
    navigation.goBack();
  };

  const handleTransform = (eventObj) => {
    // wow!
    // changing content height dynamically (only for change in zoom level)
    let a = isPortrait ? height * (SCREEN_WIDTH / width) : SCREEN_WIDTH;
    let b = eventObj.originalHeight - SCREEN_WIDTH;
    let c = a + b;
    let diff = eventObj.originalHeight - eventObj.originalWidth;
    let d = diff - diff / eventObj.zoomLevel;
    let e = c - d;
    setContentHeight(e);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cropSquare} />
      <ReactNativeZoomableView
        maxZoom={10}
        minZoom={1}
        initialZoom={1}
        visualTouchFeedbackEnabled={false}
        panBoundaryPadding={0}
        ref={zoomRef}
        contentHeight={contentHeight}
        contentWidth={
          isPortrait ? SCREEN_WIDTH : width * (SCREEN_WIDTH / height)
        }
        onTransform={handleTransform}
      >
        <Image
          source={{ uri: imageUri }}
          style={{
            width: isPortrait ? SCREEN_WIDTH : width * (SCREEN_WIDTH / height),
            height: isPortrait ? height * (SCREEN_WIDTH / width) : SCREEN_WIDTH,
          }}
        />
      </ReactNativeZoomableView>
      <LoadingFadeOverlay isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  cropSquare: {
    borderWidth: 1,
    borderColor: "white",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    position: "absolute",
    zIndex: 1,
    pointerEvents: "none",
  },
  image: (width, height) => ({
    width: width,
    height: height,
  }),
  activityIndicatorContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // shifts the indicator by half its size (default is 50px for large size), ensuring it is perfectly centered.
    zIndex: 10, // Ensure it appears above other components
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensure it appears above other content
  },
});

export default CropImageScreen;
