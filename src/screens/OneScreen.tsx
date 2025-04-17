import { View, Pressable, Image as RNImage } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { Image as ExpoImage } from "expo-image";
import myImage from "../../images/photo.jpg";
const IMAGE = RNImage.resolveAssetSource(myImage).uri;

const OneScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={() => navigation.navigate("Two")}>
        <Animated.Image
          source={{ uri: IMAGE }}
          style={{ width: 200, height: 200 }}
          resizeMode="cover"
          sharedTransitionTag="hi"
        />
      </Pressable>
    </View>
  );
};

export default OneScreen;
