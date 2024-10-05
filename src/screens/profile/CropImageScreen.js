import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useDispatch, useSelector } from "react-redux";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
// import { setHeadshotImage } from "../../redux/actions";
import { request } from "../../services/common/apiRequest";
import { colors } from "../../utils/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const CropImageScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { imageUri, width, height, isPortrait } = route.params;

  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const zoomRef = useRef();

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <TouchableOpacity onPress={handleDonePress}>
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
  }, [navigation]);

  const handleDonePress = async () => {
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
    const manipResult = await manipulateAsync(imageUri, [{ crop: cropData }], {
      compress: 1,
      format: SaveFormat.PNG,
      base64: true,
    });
    const data = {
      url: manipResult.base64, // raw base64 (does not include png specifier at beginning)
      width: width,
      height: width, // squarecrop - same dimensions - based on image width
    };
    const response = await request("post", `edit_headshot/${user.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      dispatch(setHeadshotImage(response.data.headshotImage));
    }
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
});

export default CropImageScreen;
