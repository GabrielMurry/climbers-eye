import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";

export const Slide = ({ image }) => {
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
          source={{ uri: image.base64 }}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default Slide;
