import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

const Titles = ({ boulder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>{boulder.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          {boulder.grade ? boulder.grade : "Project"}{" "}
          {boulder.quality ? (
            <>
              {" "}
              <StarIcon
                size={18}
                fill={boulder.quality >= 1 ? "gold" : "lightgray"}
                color={boulder.quality >= 1 ? "gold" : "lightgray"}
              />
              <StarIcon
                size={18}
                fill={boulder.quality >= 2 ? "gold" : "lightgray"}
                color={boulder.quality >= 2 ? "gold" : "lightgray"}
              />
              <StarIcon
                size={18}
                fill={boulder.quality === 3 ? "gold" : "lightgray"}
                color={boulder.quality === 3 ? "gold" : "lightgray"}
              />{" "}
            </>
          ) : (
            "Unrated"
          )}
        </Text>
      </View>
    </View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    rowGap: 5,
    alignItems: "center",
  },
  titleMain: {
    fontWeight: "bold",
    fontSize: 32,
  },
  titleSecondary: {
    fontSize: 18,
  },
  titleThird: {
    fontSize: 14,
  },
});
