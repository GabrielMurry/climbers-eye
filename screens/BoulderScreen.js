import { View, Text } from "react-native";
import React from "react";

const BoulderScreen = ({ route, navigation }) => {
  // dynamic routing - get the unique param
  const { itemTitle, otherParam } = route.params;

  return (
    <View>
      <Text>BoulderScreen</Text>
      <Text>itemTitle: {JSON.stringify(itemTitle)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    </View>
  );
};

export default BoulderScreen;
