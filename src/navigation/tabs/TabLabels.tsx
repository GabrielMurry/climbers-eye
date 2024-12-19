import { Text } from "react-native";
import React from "react";

type TabLabelsProps = {
  name: string;
  focused: boolean;
};

const TabLabels: React.FC<TabLabelsProps> = ({ name, focused }) => {
  // Set the label text and style based on the focused state
  const labelColor = focused ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"; // Change these colors as desired

  function displayName(routeName: string) {
    switch (routeName) {
      case "HomeStack":
        return "Home";
      case "MapStack":
        return "Map";
      case "AddBoulder":
        return "";
      case "ProfileStack":
        return "Profile";
    }
  }

  return (
    <Text style={{ color: labelColor, fontSize: 10 }}>{displayName(name)}</Text>
  );
};

export default TabLabels;
