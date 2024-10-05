import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GymCard = ({ gym }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{gym.name}</Text>
      <Text>{gym.address ? gym.address : "Home Gym"}</Text>
    </View>
  );
};

export default GymCard;

const styles = StyleSheet.create({
  textName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    marginLeft: 20,
    paddingVertical: 10,
    borderColor: "lightgray",
    borderBottomWidth: 1,
  },
});
