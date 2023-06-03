import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const GymCard = ({ gym, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.textName}>{gym.name}</Text>
        <Text>{gym.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GymCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF1",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
