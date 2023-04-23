import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { UserIcon, MapPinIcon } from "react-native-heroicons/outline";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <MapPinIcon size={25} color="black" />
      <UserIcon size={25} color="black" />
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    // height: 75,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
  },
});
