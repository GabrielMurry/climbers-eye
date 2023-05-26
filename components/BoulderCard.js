import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

const BoulderCard = ({ boulder }) => {
  return (
    <View style={styles.boulder}>
      <View style={styles.boulderLeftWrapper}>
        <Text>{boulder.name}</Text>
        <View style={styles.setterAndFA}>
          <Text>Setter: {boulder.setter}</Text>
          <Text> FA: {boulder.firstAscent}</Text>
        </View>
        <Text>{boulder.sends} sends</Text>
      </View>
      <View style={styles.boulderRightWrapper}>
        <Text>{boulder.grade ?? "Project"}</Text>
        <View style={styles.starsContainer}>
          <StarIcon
            size={15}
            fill={boulder.quality >= 1 ? "gold" : "black"}
            color={boulder.quality >= 1 ? "gold" : "black"}
          />
          <StarIcon
            size={15}
            fill={boulder.quality >= 2 ? "gold" : "black"}
            color={boulder.quality >= 2 ? "gold" : "black"}
          />
          <StarIcon
            size={15}
            fill={boulder.quality === 3 ? "gold" : "black"}
            color={boulder.quality === 3 ? "gold" : "black"}
          />
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
