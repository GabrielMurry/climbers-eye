import React from "react";
import { Image } from "expo-image";
import BoulderImage from "../BoulderImage";
import { View } from "react-native";

type PreviewImageProps = {
  boulderUri: string;
  spraywallUri: string;
  width: number;
  height: number;
};

const PreviewImage: React.FC<PreviewImageProps> = ({
  boulderUri,
  spraywallUri,
  width,
  height,
}) => {
  return (
    <View
      style={{
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <BoulderImage
        boulderUri={boulderUri}
        spraywallUri={spraywallUri}
        width={width}
        height={height}
        boulderOpacity={0.5}
      />
    </View>
  );
};

export default PreviewImage;
