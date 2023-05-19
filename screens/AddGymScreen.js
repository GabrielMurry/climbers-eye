import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "../api/axios";

const AddGymScreen = () => {
  const [gymType, setGymType] = useState("");
  const [gymName, setGymName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const navigation = useNavigation();

  const handleAddGym = () => {
    // code to add new gym to database or API
    // after validation and checking for missing fields
    axios
      .post("/gym/", {
        name: gymName,
        type: gymType,
        location: gymLocation,
      })
      .then((response) => {
        console.log(response.data.id); // store in user's gym_id? or just do that directly in django - so we pass our person id? idk
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("AddSprayWall");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Gym</Text>
      <View style={styles.typeContainer}>
        <Text style={styles.label}>Select Gym Type:</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={
              gymType === "Commercial Gym"
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => setGymType("Commercial")}
          >
            <Text style={styles.buttonText}>Commercial Gym</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              gymType === "Personal Spray Wall"
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => setGymType("Personal")}
          >
            <Text style={styles.buttonText}>Non-Commercial Gym</Text>
            <Text style={styles.buttonText}>(Home)</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gym Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Gym Name"
          value={gymName}
          onChangeText={(text) => setGymName(text)}
        />
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.label}>Gym Location:</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={
              gymLocation === "Current Location"
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => setGymLocation("Current Location")}
          >
            <Text style={styles.buttonText}>Use Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              gymLocation === "Enter Address"
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => setGymLocation("Enter Address")}
          >
            <Text style={styles.buttonText}>Enter Address</Text>
          </TouchableOpacity>
        </View>
        {gymLocation === "Enter Address" && (
          <TextInput
            style={styles.input}
            placeholder="Enter Gym Address"
            value={gymLocation}
            onChangeText={(text) => setGymLocation(text)}
          />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddGym}>
        <Text style={styles.addButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddGymScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  typeContainer: {
    marginBottom: 30,
    alignSelf: "stretch",
  },
  locationContainer: {
    marginBottom: 30,
    alignSelf: "stretch",
  },
  inputContainer: {
    marginBottom: 30,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
