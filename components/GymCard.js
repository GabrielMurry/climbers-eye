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
  textName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    height: 75,
    borderColor: "lightgray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "space-evenly",
  },
  setterAndFA: {
    flexDirection: "row",
  },
  boulderIconsContainer: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  boulderIconsRow: {
    flexDirection: "row",
    gap: 5,
  },
  boulderRightWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
});
