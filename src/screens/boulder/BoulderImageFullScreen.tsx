import { View, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { XMarkIcon } from "react-native-heroicons/outline";
import Slider from "@react-native-community/slider";

type BoulderImageFullScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "BoulderImageFull"
>;

const BoulderImageFullScreen: React.FC<BoulderImageFullScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const { boulderUri, spraywallUri, width, height } = route.params;

  const [opacity, setOpacity] = useState(0.5);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <SafeAreaView
        style={{
          position: "absolute",
          zIndex: 1,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XMarkIcon color={"white"} size={35} />
        </TouchableOpacity>
      </SafeAreaView>

      <ReactNativeZoomableView
        style={{
          backgroundColor: "black",
          width: width,
          height: height,
        }}
        maxZoom={10}
        minZoom={1}
        visualTouchFeedbackEnabled={false}
      >
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
            opacity: opacity,
          }}
          contentFit="contain"
        />
      </ReactNativeZoomableView>
      <SafeAreaView
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          alignItems: "center",
          width: width,
        }}
      >
        <Slider
          style={{ width: "75%" }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="green"
          maximumTrackTintColor="white"
          onValueChange={(val) => setOpacity(val)}
          value={opacity}
        />
      </SafeAreaView>
    </View>
  );
};

export default BoulderImageFullScreen;
