import React, { createRef, useLayoutEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { colors } from "../../utils/styles";
import { updateProfileInfo } from "../../services/profile";
import { updateUser } from "../../redux/features/user/userSlice";
import LoadingFadeOverlay from "../../components/common/LoadingFadeOverlay";
import { ImageManipulator } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../navigation/ProfileStack";
import { ZoomableViewEvent } from "@openspacelabs/react-native-zoomable-view/src/typings";
import { createImageFormData } from "../../utils/formData";

const SCREEN_WIDTH = Dimensions.get("window").width;

type CropImageScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "CropImage"
>;

const CropImageScreen: React.FC<CropImageScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { imageUri, width, height, isPortrait } = route.params;

  const [contentHeight, setContentHeight] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const zoomRef = createRef<ReactNativeZoomableView>();

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
    const eventObj = zoomRef.current!._getZoomableViewEventObject();
    setIsLoading(true);
    // wow!
    // transform info
    const cropScale = width / SCREEN_WIDTH;

    const a = SCREEN_WIDTH / eventObj.zoomLevel;
    const b = SCREEN_WIDTH - a;
    const c = b / 2;
    let newX = c - eventObj.offsetX;
    newX = newX * cropScale;
    let newY = c - eventObj.offsetY;
    newY = (height - width) / 2 + newY * cropScale;

    const cropWidth = width / eventObj.zoomLevel;
    const cropHeight = cropWidth; // square crop - same dimensions

    const cropData = {
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
    await createImageFormData(formData, formattedImage.uri, "photo");
    formData.append("profilePicWidth", width.toString()); // square crop - same dimensions - based on image width
    formData.append("profilePicHeight", width.toString());
    const response = await updateProfileInfo(formData);
    dispatch(updateUser(response.data));
    navigation.goBack();
  };

  const handleTransform = (eventObj: ZoomableViewEvent) => {
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
