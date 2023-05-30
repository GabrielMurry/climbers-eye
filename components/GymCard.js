import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GymCard = ({ gym }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{gym.name}</Text>
      <Text>{gym.location}</Text>
    </View>
  );
};

export default GymCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
