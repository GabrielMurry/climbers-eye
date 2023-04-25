import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraButton({ onPress, size, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {icon === "radio-button-on" ? (
        <Ionicons name={icon} size={size} color={color ?? "#f1f1f1"} />
      ) : icon === "rotate-3d-variant" || icon === "flash" ? (
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={color ?? "#f1f1f1"}
        />
      ) : (
        <FontAwesome5 name={icon} size={size} color={color ?? "#f1f1f1"} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
