import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GymCard = ({ gym }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{gym.name}</Text>
      <Text>{gym.location ? gym.location : "Home Gym"}</Text>
    </View>
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
