import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import isEqual from "lodash.isequal";

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
            <Text> FA: {boulder.firstAscent}</Text>
          </View>
          <Text>
            {boulder.sends} {boulder.sends === 1 ? "send" : "sends"}
          </Text>
        </View>
        <View style={styles.boulderIconsWrapper}>
          <FontAwesome
            name="bookmark"
            size={16}
            color="gold"
            style={{ opacity: 0 }}
          />
          <FontAwesome
            name="trophy"
            size={16}
            color="green"
            style={boulder.sentBoulder ? { opacity: 1 } : { opacity: 0 }}
          />
          <FontAwesome
            name="heart"
            size={16}
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
              style={boulder.quality ? { opacity: 1 } : { opacity: 0.4 }}
            />
            <StarIcon
              size={15}
              fill={boulder.quality >= 2 ? "gold" : "black"}
              color={boulder.quality >= 2 ? "gold" : "black"}
              style={boulder.quality ? { opacity: 1 } : { opacity: 0.4 }}
            />
            <StarIcon
              size={15}
              fill={boulder.quality === 3 ? "gold" : "black"}
              color={boulder.quality === 3 ? "gold" : "black"}
              style={boulder.quality ? { opacity: 1 } : { opacity: 0.4 }}
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
    backgroundColor: "#FFFBF1",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    // adding shadow to boulder card
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
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
    // justifyContent: "space-evenly",
    alignItems: "center",
    width: "40%",
    position: "absolute",
    right: 0,
    height: "100%",
    gap: 10,
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
