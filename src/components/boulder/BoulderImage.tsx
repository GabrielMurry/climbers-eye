import { Pressable, Dimensions, View } from "react-native";
import React, { useState } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

type BoulderImageProps = {
  spraywallUri: string;
  boulderUri: string;
  width: number;
  height: number;
  shrinkScale?: number;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const centerX = SCREEN_WIDTH / 2;
const centerY = SCREEN_HEIGHT / 2;

const BoulderImage: React.FC<BoulderImageProps> = ({
  spraywallUri,
  boulderUri,
  width,
  height,
  shrinkScale = 1,
}) => {
  const navigation = useNavigation();

  const normalWidth = width * shrinkScale;
  const normalHeight = height * shrinkScale;
  const enlargedWidth = SCREEN_WIDTH;
  const enlargedHeight = height * (SCREEN_WIDTH / width);

  const [containerHeight, setContainerHeight] = useState(0);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BoulderImageFull", {
          boulderUri,
          spraywallUri,
          width: enlargedWidth,
          height: enlargedHeight,
        })
      }
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
      }}
      style={{
        alignItems: "center",
        width: containerHeight * (width / height),
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          width: containerHeight * (width / height),
          height: containerHeight,
          position: "absolute",
        }}
      />
      <Image
        source={spraywallUri}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
        contentFit="contain"
      />
      <MaskedView
        style={{ position: "absolute", width: "100%", height: "100%" }}
        maskElement={
          <Image
            source={boulderUri}
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
            }}
            contentFit="contain"
          />
        }
      >
        <Image
          source={spraywallUri}
          style={{
            width: "100%",
            height: "100%",
            opacity: 1,
          }}
          contentFit="contain"
        />
      </MaskedView>
      <Image
        source={boulderUri}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.5,
        }}
        contentFit="contain"
      />
    </Pressable>
  );
};

export default BoulderImage;
