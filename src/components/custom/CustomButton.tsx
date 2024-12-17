import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  DimensionValue,
} from "react-native";
import React from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";

type CustomButtonProps = {
  onPress: () => void;
  text: string;
  type?: string;
  bgColor?: string;
  fgColor?: string;
  width?: DimensionValue;
  isLoading?: boolean;
  disabled?: boolean;
};

// if no type specified, default to PRIMARY
const CustomButton: React.FC<CustomButtonProps> = ({
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
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: "#3b71f3" },
        bgColor ? { backgroundColor: bgColor } : null,
        { width: width },
        disabled ? { opacity: 0.5 } : null,
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={[
              styles.text,
              { backgroundColor: "#3b71f3" },
              fgColor ? { color: fgColor } : {},
            ]}
          >
            {text}
          </Text>
          {/* {icon} */}
        </View>
      )}
    </TouchableOpacity>
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
    borderRadius: 100,
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
