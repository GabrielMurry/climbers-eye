import { Text } from "react-native";
import React from "react";

const TabLabels = ({ route, focused }) => {
  // Set the label text and style based on the focused state
  const labelColor = focused ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"; // Change these colors as desired

  function displayName(routeName) {
    switch (routeName) {
      case "Home":
        return "Home";
      case "Map":
        return "Map";
      case "AddBoulder":
        return "";
      case "ProfileStack-Tabs":
        return "Profile";
    }
  }

  return (
    <Text style={{ color: labelColor, fontSize: 10 }}>
      {displayName(route.name)}
    </Text>
  );
};

export default TabLabels;
