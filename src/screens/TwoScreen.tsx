import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  InnerStackParamList,
  RootStackParamList,
} from "../navigation/AppNavigator";
import { Image } from "expo-image";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const CUTOFF = 50;
const LEFT_CUTOFF = CUTOFF;
const RIGHT_CUTOFF = -CUTOFF;
const TOP_CUTOFF = CUTOFF;

type TwoScreenProps = NativeStackScreenProps<InnerStackParamList, "Two">;

const TwoScreen: React.FC<TwoScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { source, start } = route.params;

  // const isPressed = useSharedValue(false);
  // const offset = useSharedValue({ x: 0, y: 0 });
  // const canGoBack = useSharedValue(false);
  // const canVibrate = useSharedValue(false);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: isPressed.value
  //           ? offset.value.x
  //           : withTiming(offset.value.x),
  //       },
  //       {
  //         translateY: isPressed.value
  //           ? offset.value.y
  //           : withTiming(offset.value.y),
  //       },
  //     ],
  //     // backgroundColor: isPressed.value ? "yellow" : "blue",
  //   };
  // });

  // const hapticLight = () => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  // };

  // const start = useSharedValue({ x: 0, y: 0 });
  // const gesture = Gesture.Pan()
  //   .onBegin(() => {
  //     isPressed.value = true;
  //   })
  //   .onUpdate((e) => {
  //     if (
  //       offset.value.x >= LEFT_CUTOFF ||
  //       offset.value.x <= RIGHT_CUTOFF ||
  //       offset.value.y >= TOP_CUTOFF
  //     ) {
  //       if (!canGoBack.value) {
  //         runOnJS(hapticLight)();
  //       }
  //       canGoBack.value = true;
  //     } else {
  //       canGoBack.value = false;
  //     }
  //     offset.value = {
  //       x: e.translationX + start.value.x,
  //       y: e.translationY + start.value.y,
  //     };
  //   })
  //   .onEnd(() => {
  //     if (!canGoBack.value) {
  //       offset.value = {
  //         x: start.value.x,
  //         y: start.value.y,
  //       };
  //     }
  //   })
  //   .onFinalize(() => {
  //     isPressed.value = false;
  //     if (canGoBack.value) {
  //       runOnJS(navigation.goBack)();
  //     }
  //   });

  // const scrollViewRef = useRef<ScrollView>(null);
  // const [isScrolling, setIsScrolling] = useState(false);
  // const [scrollEnabled, setScrollEnabled] = useState(true);

  // const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const y = e.nativeEvent.contentOffset.y;
  //   if (y > 0) {
  //     setIsScrolling(true);
  //   }
  //   if (y < 0 && !isScrolling) {
  //     setScrollEnabled(false);
  //   }
  // };

  // const handleOnScrollEnd = () => {
  //   setIsScrolling(false);
  // };

  const [animationDone, setAnimationDone] = useState(false);

  const width = useSharedValue(start.width);
  const height = useSharedValue(start.height);
  const x = useSharedValue(start.x);
  const y = useSharedValue(start.y);

  useEffect(() => {
    const finalWidth = Dimensions.get("window").width;
    const finalHeight = finalWidth * (start.height / start.width); // maintain aspect ratio

    width.value = withTiming(finalWidth, { duration: 500 });
    height.value = withTiming(finalHeight, { duration: 500 });
    x.value = withTiming(0, { duration: 500 });
    y.value = withTiming(100, { duration: 500 }, () => {
      runOnJS(setAnimationDone)(true);
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
    position: "absolute",
    top: y.value,
    left: x.value,
    borderRadius: 10,
  }));

  return (
    // <GestureDetector gesture={gesture}>
    //   <Animated.View style={[styles.view, animatedStyles]}>
    //     <Animated.Image
    //       source={require("../../images/photo.jpg")}
    //       style={{ width: 300, height: 300 }}
    //       // contentFit="contain"
    //       resizeMode={"contain"}
    //       sharedTransitionTag="hi"
    //     />
    //     <Pressable onPress={() => navigation.goBack()}>
    //       <Text>TwoScreen</Text>
    //     </Pressable>
    //   </Animated.View>
    // </GestureDetector>
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={source}
          style={{ width: 300, height: 300 }}
          contentFit="contain"
          cachePolicy={"memory-disk"}
        />
      </Pressable>
      {/* {animationDone && (
        <Image
          source={source}
          style={{
            width: "100%",
            height: 300,
            marginTop: 100,
            borderRadius: 10,
          }}
        />
      )} */}
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
