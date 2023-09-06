import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CheckIcon, LinkIcon, StarIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import isEqual from "lodash.isequal";
import { Image } from "react-native";

// We have to optimize the rendering of components - avoid unnecessary re-renders (we will use a form of PureComponent)
// React.memo wraps the functional component and memoizes its rendering
// It performs a shallow comparison of the incoming props and prevents re-renders if the props HAVEN'T changed
const BoulderCard = React.memo(
  ({ boulder }) => {
    return (
      <View style={styles.boulder}>
        <View style={styles.boulderLeftWrapper}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {boulder.name}
          </Text>
          <View style={styles.setterAndFA}>
            <Text>Setter: {boulder.setter}</Text>
            <Text> FA: {boulder.firstAscent ? boulder.firstAscent : "-"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <CheckIcon
              size={15}
              color={boulder.isSent ? "green" : "lightgray"}
            />
            <FontAwesome
              name="heart"
              size={15}
              color={boulder.isLiked ? "red" : "lightgray"}
            />
            <FontAwesome
              name="bookmark"
              size={15}
              color={boulder.isBookmarked ? "gold" : "lightgray"}
            />
            <LinkIcon
              size={15}
              color={boulder.inCircuit ? "blue" : "lightgray"}
            />
          </View>
        </View>
        {boulder.publish ? null : (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>Draft</Text>
          </View>
        )}
        <View style={styles.boulderIconsContainer}></View>
        <View style={styles.boulderRightWrapper}>
          <Text>{boulder.grade ? boulder.grade : "Project"}</Text>
          <View style={styles.starsContainer}>
            <StarIcon
              size={15}
              fill={boulder.quality >= 1 ? "gold" : "lightgray"}
              color={boulder.quality >= 1 ? "gold" : "lightgray"}
            />
            <StarIcon
              size={15}
              fill={boulder.quality >= 2 ? "gold" : "lightgray"}
              color={boulder.quality >= 2 ? "gold" : "lightgray"}
            />
            <StarIcon
              size={15}
              fill={boulder.quality === 3 ? "gold" : "lightgray"}
              color={boulder.quality === 3 ? "gold" : "lightgray"}
            />
          </View>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function is defined as the second argument to React.memo. It receives the previous props (prevProps) and the next props (nextProps) as arguments.
    // Using 'isEqual' function from lodash to perform deep comparison of the boulder prop
    // Should return true if the boulder prop is considered equal between the previous and next props, indicating that a re-render is not necessary.
    return isEqual(prevProps.boulder, nextProps.boulder);
  }
);

export default BoulderCard;

const styles = StyleSheet.create({
  boulder: {
    height: 80,
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  boulderLeftWrapper: {
    flex: 1,
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
