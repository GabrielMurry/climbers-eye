import React, { useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useDispatch } from "react-redux";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const CropImageScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { imageUri, orientation, scale, width, height, cropDimensions } =
    route.params;
  const [imageCoordinates, setImageCoordinates] = useState({
    x: 0,
    y: (height - width) / 2,
  });

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
              color: "rgb(0,122, 255)",
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
              color: "rgb(0,122, 255)",
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

  // const imageWidth = width; // Replace with your image's actual width
  // const imageHeight = height; // Replace with your image's actual height

  // // Calculate aspect ratio
  // const aspectRatio = imageWidth / imageHeight;

  // // Calculate scaled dimensions while maintaining the aspect ratio
  // let calculatedWidth = ScreenWidth;
  // let calculatedHeight = ScreenWidth / aspectRatio;

  // if (calculatedHeight > ScreenHeight) {
  //   calculatedHeight = ScreenHeight;
  //   calculatedWidth = ScreenHeight * aspectRatio;
  // }

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (_, gestureState) => {
  //       if (orientation === "vertical") {
  //         // keep in the boundary of the image
  //         if (
  //           gestureState.moveY - gestureState.y0 <=
  //             (calculatedHeight - calculatedWidth) / 2 &&
  //           gestureState.moveY - gestureState.y0 >=
  //             -(calculatedHeight - calculatedWidth) / 2
  //         ) {
  //           setImageCoordinates({
  //             x: imageCoordinates.x,
  //             y: gestureState.moveY - gestureState.y0,
  //           });
  //         }
  //       } else if (orientation === "horizontal") {
  //         // keep in the boundary of the image
  //         if (
  //           gestureState.moveX - gestureState.x0 <=
  //             (calculatedWidth - calculatedHeight) / 2 &&
  //           gestureState.moveX - gestureState.x0 >=
  //             -(calculatedWidth - calculatedHeight) / 2
  //         ) {
  //           setImageCoordinates({
  //             x: gestureState.moveX - gestureState.x0,
  //             y: imageCoordinates.y,
  //           });
  //         }
  //       }
  //     },
  //   })
  // ).current;

  // const handleDone = async () => {
  //   console.log(
  //     (width - cropDimensions.width * scale) / 2 - imageCoordinates.x * scale
  //   );
  //   const cropData = {
  //     originX:
  //       (width - cropDimensions.width * scale) / 2 - imageCoordinates.x * scale, // X-coordinate of the top-left corner of the crop area
  //     originY:
  //       (height - cropDimensions.height * scale) / 2 -
  //       imageCoordinates.y * scale, // Y-coordinate of the top-left corner of the crop area
  //     width: width, // Width of the crop area
  //     height: cropDimensions.height * scale, // Height of the crop area
  //   };
  //   const manipResult = await manipulateAsync(imageUri, [{ crop: cropData }], {
  //     compress: 1,
  //     format: SaveFormat.PNG,
  //     base64: true,
  //   });
  //   const headshotImage = {
  //     url: "data:image/png;base64," + manipResult.base64,
  //     width: width,
  //     height: height,
  //   };
  //   navigation.navigate("Headshot", { headshotImage });
  // };

  const handleDonePress = async () => {
    // transform info
    console.log("imageCoordinates.y", imageCoordinates.y);
    console.log("offsetY", zoomRef.current.offsetY);
    const scaleX = width / 393; // DO DYNAMIC
    const scaleY = height / 754; // DO DYNAMIC
    const originX = imageCoordinates.x - zoomRef.current.offsetX * scaleX;
    const originY = imageCoordinates.y - zoomRef.current.offsetY * scaleY;
    const cropWidth = width / zoomRef.current.zoomLevel;
    const cropHeight = cropWidth; // square crop - same dimensions
    console.log("x", originX);
    console.log("y", originY);
    console.log("width", cropWidth);
    console.log("height", cropHeight);
    cropData = {
      originX: originX,
      originY: originY,
      width: cropWidth,
      height: cropHeight,
    };
    const manipResult = await manipulateAsync(imageUri, [{ crop: cropData }], {
      compress: 1,
      format: SaveFormat.PNG,
      base64: true,
    });
    const headshotImage = {
      url: "data:image/png;base64," + manipResult.base64,
      width: width,
      height: height,
    };
    navigation.navigate("Headshot", { headshotImage });
  };

  return (
    // <View style={styles.container}>
    //   <View
    //     style={{
    //       borderWidth: 2,
    //       borderColor: "red",
    //       width:
    //         orientation === "vertical" ? calculatedWidth : calculatedHeight,
    //       height:
    //         orientation === "vertical" ? calculatedWidth : calculatedHeight,
    //       position: "absolute",
    //       zIndex: 1,
    //       pointerEvents: "none",
    //     }}
    //   />
    //   <View
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       backgroundColor: "blue",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Image
    //       source={{ uri: imageUri }}
    //       style={{
    //         width: calculatedWidth,
    //         height: calculatedHeight,
    //         left: imageCoordinates.x,
    //         top: imageCoordinates.y,
    //       }}
    //       resizeMode="contain"
    //       {...panResponder.panHandlers}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     onPress={handleDone}
    //     style={{ position: "absolute", bottom: 0, marginBottom: 25 }}
    //   >
    //     <Text>Done</Text>
    //   </TouchableOpacity>
    // </View>
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      {/* <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            position: "absolute",
            top: 60,
            left: 10,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onRequestClose}
        >
          <Ionicons name="close" size={40} color="white" />
        </TouchableOpacity> */}
      <View
        style={{
          borderWidth: 2,
          borderColor: "red",
          width: ScreenWidth,
          height: ScreenWidth,
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <ReactNativeZoomableView
        maxZoom={10}
        minZoom={1}
        initialZoom={1}
        visualTouchFeedbackEnabled={false}
        panBoundaryPadding={200}
        ref={zoomRef}
        onTransform={(zoomObj) => {
          console.log("x", imageCoordinates.x - zoomObj.offsetX);
          console.log("y", imageCoordinates.y - zoomObj.offsetY);
          console.log(zoomObj);
        }}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.image(ScreenWidth, height * (ScreenWidth / width))}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // image: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "contain",
  // },
  // cropOverlay: {
  //   position: "absolute",
  //   borderWidth: 2,
  //   borderColor: "red",
  // },
  image: (width, height) => ({
    width: width,
    height: height,
  }),
});

export default CropImageScreen;
