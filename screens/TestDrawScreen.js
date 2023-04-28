import React, { useRef } from "react";
import { Image, View, Animated } from "react-native";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

const TestDrawScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ReactNativeZoomableView
        maxZoom={5}
        minZoom={0.5}
        zoomStep={0}
        initialZoom={1}
        bindToBorders={false}
      >
        <Image
          source={require("../assets/rockwall.jpg")}
          style={{
            width: 500,
            height: 500,
          }}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

export default TestDrawScreen;
