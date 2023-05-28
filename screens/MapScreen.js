import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { MapPinIcon, PlusIcon } from "react-native-heroicons/outline";
import { useHeaderHeight } from "@react-navigation/elements";

const MapScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // grabbing height of header
  const height = useHeaderHeight();

  return (
    <View style={styles.mapContainer}>
      <View style={styles.addGymContainer}>
        <View style={styles.addGym}>
          <Text>Don't see your gym or home wall?</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddGym")}
          >
            <PlusIcon size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        initialRegion={{
          latitude: 38.575764,
          longitude: -121.478851,
          latitudeDelta: 0.05, // zoom scale
          longitudeDelta: 0.05,
        }}
        style={{ flex: 1 }}
      >
        <Marker
          coordinate={{ latitude: 38.575764, longitude: -121.478851 }}
          title="my title"
          description="my description"
          identifier="origin"
          pinColor="red"
        />
      </MapView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={height}
        style={styles.searchContainer}
      >
        <View style={styles.currentLocationContainer}>
          <TouchableOpacity style={styles.currentLocation}>
            <MapPinIcon size={25} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          // onChange doesn't exist in react native. use onChangeText
          onChangeText={(text) => setSearchTerm(text)} // in react native, you don't have to do e.target.value
          placeholder="Search Gyms or Home Walls"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  addGymContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    position: "absolute",
    zIndex: 1,
  },
  addGym: {
    backgroundColor: "#ffd0d2",
    borderColor: "black",
    borderWidth: 1,
    width: "95%",
    height: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    width: "100%",
    marginBottom: 75,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    rowGap: 10,
  },
  currentLocationContainer: {
    width: "90%",
    alignItems: "flex-end",
  },
  currentLocation: {
    width: 50,
    height: 50,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  searchInput: {
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    // adding shadow to button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
