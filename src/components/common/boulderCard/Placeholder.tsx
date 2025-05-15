import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Placeholder = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default Placeholder;
