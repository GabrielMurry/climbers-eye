import React, { useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";

export const Slide = ({ image, isSquare }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.slide}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: image.width ? image.width / 11 : "",
          height: image.height ? image.height / 11 : "",
        }}
      >
        <Image
          source={{ uri: image.url }}
          resizeMode={isSquare ? null : "contain"}
          style={{
            width: isSquare ? 100 : "100%",
            height: isSquare ? 100 : "100%",
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
