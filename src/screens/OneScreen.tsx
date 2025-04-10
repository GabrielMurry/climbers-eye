import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";

const OneScreen = () => {
  const navigation = useNavigation();

  const width = useSharedValue(200);
  const height = useSharedValue(200);

  // const animatedStyles = useAnimatedStyle(() => ({
  //   width: 300,
  //   height: 300,
  // }));

  const handlePress = () => {
    width.value = withTiming(width.value + 100, { duration: 250 });
    height.value = withTiming(height.value + 100, { duration: 250 });
  };

  const imageRef = useRef<Image>(null);

  const onPress = () => {
    // navigation.navigate("Two", {
    //   source: require("../../images/photo.jpg"),
    //   start: { x: 0, y: 0, width: 0, height: 0 },
    // });
    navigation.navigate("Main", {
      screen: "Two",
      params: {
        source: require("../../images/photo.jpg"),
        start: { x: 0, y: 0, width: 0, height: 0 },
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Pressable onPress={onPress}>
        <Image
          ref={imageRef}
          source={require("../../images/photo.jpg")}
          style={{ width: 100, height: 100, borderRadius: 10 }}
          contentFit="contain"
          cachePolicy={"memory-disk"}
        />
      </Pressable>
      {/* <Pressable onPress={() => navigation.navigate("Two")}>
        <Text>OneScreen</Text>
      </Pressable> */}
    </View>
  );
};

export default OneScreen;
