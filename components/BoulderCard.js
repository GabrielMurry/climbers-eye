import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

const BoulderCard = ({ title, setter, FA, sends, grade, stars }) => {
  return (
    <View style={styles.boulder}>
      <View style={styles.boulderLeftWrapper}>
        <Text>{title}</Text>
        <View style={styles.setterAndFA}>
          <Text>Setter: {setter}</Text>
          <Text> FA: {FA}</Text>
        </View>
        <Text>{sends} sends</Text>
      </View>
      <View style={styles.boulderRightWrapper}>
        <Text>{grade}</Text>
        <View style={styles.starsContainer}>
          <StarIcon size={15} fill={stars >= 1 ? "gold" : ""} color="gold" />
          <StarIcon size={15} fill={stars >= 2 ? "gold" : ""} color="gold" />
          <StarIcon size={15} fill={stars === 3 ? "gold" : ""} color="gold" />
        </View>
      </View>
    </View>
  );
};

export default BoulderCard;

const styles = StyleSheet.create({
  boulder: {
    height: 65,
    // borderBottomColor: "black",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    backgroundColor: "#fffdd0",
    borderColor: "#fff50c",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  boulderLeftWrapper: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-evenly",
  },
  setterAndFA: {
    flexDirection: "row",
  },
  boulderRightWrapper: {
    width: 75,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
});
