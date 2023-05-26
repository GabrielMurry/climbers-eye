import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon, BookmarkIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";

const BoulderCard = ({ boulder }) => {
  return (
    <View style={styles.boulder}>
      <View style={styles.boulderLeftWrapper}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{boulder.name}</Text>
        <View style={styles.setterAndFA}>
          <Text>Setter: {boulder.setter}</Text>
          <Text> FA: {boulder.firstAscent}</Text>
        </View>
        <Text>
          {boulder.sends} {boulder.sends === 1 ? "send" : "sends"}
        </Text>
      </View>
      <View style={styles.boulderIconsWrapper}>
        <FontAwesome
          name="bookmark"
          size={18}
          color="gold"
          style={{ opacity: 0 }}
        />
        <FontAwesome
          name="trophy"
          size={18}
          color="green"
          style={boulder.sentBoulder ? { opacity: 1 } : { opacity: 0 }}
        />
        <FontAwesome
          name="heart"
          size={18}
          color="red"
          style={boulder.personLiked ? { opacity: 1 } : { opacity: 0 }}
        />
      </View>
      <View style={styles.boulderRightWrapper}>
        <Text>{boulder.grade ?? "Project"}</Text>
        <View style={styles.starsContainer}>
          <StarIcon
            size={15}
            fill={boulder.quality >= 1 ? "gold" : "black"}
            color={boulder.quality >= 1 ? "gold" : "black"}
            style={boulder.quality ? { opacity: 1 } : { opacity: 0 }}
          />
          <StarIcon
            size={15}
            fill={boulder.quality >= 2 ? "gold" : "black"}
            color={boulder.quality >= 2 ? "gold" : "black"}
            style={boulder.quality ? { opacity: 1 } : { opacity: 0 }}
          />
          <StarIcon
            size={15}
            fill={boulder.quality === 3 ? "gold" : "black"}
            color={boulder.quality === 3 ? "gold" : "black"}
            style={boulder.quality ? { opacity: 1 } : { opacity: 0 }}
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
    flexDirection: "row",
    backgroundColor: "#fffdd0",
    borderColor: "#fff50c",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  boulderLeftWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  setterAndFA: {
    flexDirection: "row",
  },
  boulderIconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 100,
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
