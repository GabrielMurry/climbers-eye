import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

const Titles = ({ boulder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>{boulder.name}</Text>
      <Text style={styles.titleSecondary}>
        {boulder.grade ?? "Project"}{" "}
        {boulder.quality ? (
          <>
            {" "}
            <StarIcon
              size={20}
              fill={boulder.quality >= 1 ? "gold" : "black"}
              color={boulder.quality >= 1 ? "gold" : "black"}
            />
            <StarIcon
              size={20}
              fill={boulder.quality >= 2 ? "gold" : "black"}
              color={boulder.quality >= 2 ? "gold" : "black"}
            />
            <StarIcon
              size={20}
              fill={boulder.quality === 3 ? "gold" : "black"}
              color={boulder.quality === 3 ? "gold" : "black"}
            />{" "}
          </>
        ) : (
          "Unrated"
        )}
      </Text>
      <Text style={styles.titleThird}>
        Setter: {boulder.setter} FA: {boulder.firstAscent ?? "-"}
      </Text>
    </View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  container: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
  },
  titleMain: {
    fontWeight: "bold",
    fontSize: 30,
  },
  titleSecondary: {
    fontSize: 20,
  },
  titleThird: {
    fontSize: 14,
  },
});
