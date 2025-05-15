import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import Icons from "./Icons";
import { Boulder } from "../../../utils/types/boulder";
import { Spraywall } from "../../../utils/types/spraywall";

type ImageCardProps = {
  boulder: Boulder;
  spraywall: Spraywall;
  setIsWallLoading: (isLoading: boolean) => void;
  setIsBoulderLoading: (isLoading: boolean) => void;
};

const CardImage: React.FC<ImageCardProps> = ({
  boulder,
  spraywall,
  setIsWallLoading,
  setIsBoulderLoading,
}) => {
  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
      }}
      imageStyle={{ borderRadius: 20 }}
      source={{
        uri: boulder.altWallThumbnailUrl
          ? boulder.altWallThumbnailUrl
          : spraywall.thumbnailUrl,
      }}
      onLoadEnd={() => setIsWallLoading(false)}
    >
      <Image
        source={{ uri: boulder.url }}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.5,
          borderRadius: 20,
        }}
        onLoadEnd={() => setIsBoulderLoading(false)}
      />
      <View style={{ position: "absolute", right: 0, top: 0 }}>
        <Icons size={20} boulder={boulder} />
      </View>
    </ImageBackground>
  );
};

export default CardImage;
