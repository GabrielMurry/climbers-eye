import { View, Text } from "react-native";
import React from "react";

const BoulderScreen = ({ route, navigation }) => {
  // dynamic routing - get the unique param
  const { itemId, otherParam } = route.params;

  return (
    <View>
      <Text>BoulderScreen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    </View>
  );
};

export default BoulderScreen;
