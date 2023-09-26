import { Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React from "react";

// if no type specified, default to PRIMARY
const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  width = "100%",
  isLoading,
  disabled = false,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : null,
        { width: width },
        disabled ? { opacity: 0.5 } : null,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3b71f3",
  },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
  },

  text_PRIMARY: {
    color: "white",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    color: "gray",
  },
});
