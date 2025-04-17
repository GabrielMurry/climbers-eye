import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Image as RNImage,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import myImage from "../../images/photo.jpg";
import { Image as ExpoImage } from "expo-image";
const IMAGE = RNImage.resolveAssetSource(myImage).uri;

const TwoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Animated.Image
          source={{ uri: IMAGE }}
          style={{ width: 300, height: 300 }}
          resizeMode="cover"
          sharedTransitionTag="hi"
        />
      </Pressable>
    </View>
  );
};

export default TwoScreen;

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
  view: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
