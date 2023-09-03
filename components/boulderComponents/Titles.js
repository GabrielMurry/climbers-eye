import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/outline";

const Titles = ({ boulder }) => {
  return (
    <View style={styles.container}>
      {boulder.publish ? null : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "red", flex: 1, height: 1 }} />
          <Text
            style={{ color: "red", fontWeight: "bold", paddingHorizontal: 10 }}
          >
            Draft
          </Text>
          <View style={{ backgroundColor: "red", flex: 1, height: 1 }} />
        </View>
      )}
      <Text style={styles.titleMain}>{boulder.name}</Text>
      <Text style={styles.titleSecondary}>
        {boulder.grade ?? "Project"}{" "}
        {boulder.quality ? (
          <>
            {" "}
            <StarIcon
              size={20}
              fill={boulder.quality >= 1 ? "gold" : "lightgray"}
              color={boulder.quality >= 1 ? "gold" : "lightgray"}
            />
            <StarIcon
              size={20}
              fill={boulder.quality >= 2 ? "gold" : "lightgray"}
              color={boulder.quality >= 2 ? "gold" : "lightgray"}
            />
            <StarIcon
              size={20}
              fill={boulder.quality === 3 ? "gold" : "lightgray"}
              color={boulder.quality === 3 ? "gold" : "lightgray"}
            />{" "}
          </>
        ) : (
          "Unrated"
        )}
      </Text>
      <Text style={styles.titleThird}>Setter: {boulder.setter}</Text>
      <Text style={styles.titleThird}>FA: {boulder.firstAscent ?? "-"}</Text>
    </View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 20,
    rowGap: 5,
    // alignItems: "center",
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
