import { View, Text, StyleSheet } from "react-native";
import React from "react";

const isBoulder = true;

const ModalTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {isBoulder ? "Add Boulder" : "Add New Spray Wall"}
      </Text>
    </View>
  );
};

export default ModalTitle;

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
