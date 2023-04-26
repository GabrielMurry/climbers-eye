import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraIcon } from "react-native-heroicons/outline";
import PhoneCamera from "../components/PhoneCamera";

const imageScaleDownFactor = 10;

const AddBoulderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add New Boulder</Text>
        <Text style={styles.subTitleText}>to [Spray Wall]</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.defaultPhoto}>
          <Text>Default Photo</Text>
        </TouchableOpacity>
        <Text>Or</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() =>
            navigation.navigate("Camera", { screen: "EditBoulder" })
          }
        >
          <View style={styles.imagePlaceholderContainer}>
            <CameraIcon size={30} color="black" />
            <Text style={styles.imagePlaceholderText}>Take a Picture</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddBoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 25,
  },
  defaultPhoto: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  imageButton: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagePlaceholderContainer: {
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 16,
  },
});
