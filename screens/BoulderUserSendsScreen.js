import { View, Text } from "react-native";
import React from "react";
import useCustomHeader from "../hooks/useCustomHeader";

const BoulderUserSendsScreen = ({ navigation, route }) => {
  const { boulder } = route.params;
  useCustomHeader({
    navigation,
    title: "Your Sends",
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Text>BoulderUserSendsScreen</Text>
    </View>
  );
};

export default BoulderUserSendsScreen;
