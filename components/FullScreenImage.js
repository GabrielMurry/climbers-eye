import {
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const FullScreenImage = ({
  imageFullScreen,
  url,
  width,
  height,
  onRequestClose,
}) => {
  return (
    <Modal
      visible={imageFullScreen}
      transparent
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <TouchableOpacity
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
        </TouchableOpacity>
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={1}
          initialZoom={1}
          visualTouchFeedbackEnabled={false}
        >
          <Image
            source={{ uri: url }}
            style={{
              width: SCREEN_WIDTH,
              height: height * (SCREEN_WIDTH / width),
            }}
          />
        </ReactNativeZoomableView>
      </SafeAreaView>
    </Modal>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({
  image: (width, height) => ({
    width: width,
    height: height,
  }),
});
