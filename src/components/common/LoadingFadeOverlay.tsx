import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type LoadingFadeOverlayProps = {
  isLoading?: boolean;
};

const LoadingFadeOverlay: React.FC<LoadingFadeOverlayProps> = ({
  isLoading = false,
}) => {
  const fadeAnim = useSharedValue(0); // Initial opacity

  const toggleFade = () => {
    // Fade in the overlay
    fadeAnim.value = withTiming(1, { duration: 300 });

    // Simulate a 3-second loading process
    // setTimeout(() => {
    //   // Fade out the overlay
    //   fadeAnim.value = withTiming(0, { duration: 300 }, () => {
    //     setLoading(false);
    //   });
    // }, 3000);
  };

  useEffect(() => {
    if (isLoading) {
      toggleFade();
    }
  }, [isLoading]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
      <ActivityIndicator size="large" />
    </Animated.View>
  );
};

export default LoadingFadeOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensure it appears above other content
  },
});
