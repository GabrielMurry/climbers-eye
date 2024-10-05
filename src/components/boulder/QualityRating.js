import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import MaskedView from "@react-native-masked-view/masked-view";

const QualityRating = ({ quality, size }) => {
  // Create an array with a specified number of StarIcons
  const starsArray = Array(3)
    .fill(0)
    .map((_, index) => <StarIcon key={index} color="black" size={size} />);

  return (
    <View
      style={[
        styles.qualityContainer,
        { width: size * starsArray.length, height: size },
      ]}
    >
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.starRow}>
            {/* Masked stars */}
            {starsArray}
          </View>
        }
      >
        {/* Gold background visible within the stars */}
        {quality ? (
          <View
            style={{
              height: "100%",
              width: `${(quality / 3) * 100}%`,
              backgroundColor: "gold",
            }}
          />
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "lightgray",
            }}
          />
        )}
      </MaskedView>
    </View>
  );
};

export default QualityRating;

const styles = StyleSheet.create({
  qualityContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Remove background color
  },
  maskedView: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    height: "100%", // Ensure the masked view has height and width
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Ensure the star row matches the masked view's height and width
  },
  goldBackground: {
    backgroundColor: "gold",
    height: "100%", // Ensure the blue background fills the mask
  },
});
