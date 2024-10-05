import React, { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";

export const Slide = ({ image, isSquare }) => {
  const [isLoading, setIsLoading] = useState(false);
  let newWidth, newHeight;

  if (image.width > image.height) {
    newWidth = 325;
    newHeight = (325 * image.height) / image.width;
  } else {
    newHeight = 325;
    newWidth = (325 * image.width) / image.height;
  }

  return (
    <View style={styles.slide}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: newWidth,
          height: newHeight,
        }}
      >
        <Image
          source={{ uri: image.url }}
          resizeMode={isSquare ? null : "contain"}
          style={{
            width: isSquare ? 115 : "100%",
            height: isSquare ? 115 : "100%",
            borderRadius: 10,
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Slide;
