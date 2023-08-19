import {
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../general/Header";

const THEME_STYLE = "black";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ImageDisplay = ({
  image,
  setImageFullScreen,
  isLoading,
  setIsLoading,
}) => {
  const [modScreenWidth, setModScreenWidth] = useState(SCREEN_WIDTH);

  useEffect(() => {
    setModScreenWidth(
      image.width > image.height ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 60
    );
  }, []);

  return (
    // <View
    //   style={{
    //     alignItems: "center",
    //     paddingHorizontal: 10,
    //   }}
    // >
    //   <View
    //     style={{
    //       backgroundColor: "gray",
    //       width: "100%",
    //       aspectRatio: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //       borderRadius: 20,
    //       backgroundColor: THEME_STYLE,
    //     }}
    //   >
    //     <View
    //       style={{
    //         width: WIDTH,
    //         aspectRatio: 1,
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Pressable
    //         style={{
    //           width:
    //             orientation === "horizontal"
    //               ? "100%"
    //               : image.width * (WIDTH / image.height),
    //           height:
    //             orientation === "horizontal"
    //               ? image.height * (WIDTH / image.width)
    //               : WIDTH,
    //         }}
    //         onPress={() => setImageFullScreen(true)}
    //       >
    //         <Image
    //           source={{
    //             uri: image.url,
    //           }}
    //           resizeMode="contain"
    //           onLoadStart={() => setIsLoading(true)}
    //           onLoadEnd={() => setIsLoading(false)}
    //           style={{
    //             width: "100%",
    //             height: "100%",
    //             borderRadius: 20,
    //           }}
    //         />
    //         {isLoading && (
    //           <ActivityIndicator
    //             size="large"
    //             style={{ width: "100%", height: "100%", position: "absolute" }}
    //           />
    //         )}
    //       </Pressable>
    //     </View>
    //   </View>
    // </View>
    <Pressable
      style={{
        width: "100%",
        height: image.height * (modScreenWidth / image.width),
      }}
      onPress={() => setImageFullScreen(true)}
    >
      <Image
        source={{
          uri: image.url,
        }}
        resizeMode="contain"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      )}
    </Pressable>
  );
};

export default ImageDisplay;
