import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { request } from "../api/requestMethods";

const EditSprayWallScreen = ({ route }) => {
  const { id, name, base64, width, height } = route.params.spraywall;
  const [sprayWallName, setSprayWallName] = useState(name);

  const handleDelete = async () => {
    Alert.alert(
      "Delete Circuit",
      `Are you sure you want to delete "${name}"?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request("delete", `delete_spraywall/${id}`);
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            console.log("successfully deleted spraywall:", id);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <View style={[styles.inputAndAddContainer, { height: "15%" }]}>
          <Text style={styles.label}>Spray Wall Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter spray wall name"
            value={sprayWallName}
            onChangeText={(text) => setSprayWallName(text)}
          />
        </View>
        <Image
          source={{ uri: base64 }}
          style={{
            width: "100%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode="contain"
        />
        <View style={{ height: "15%", justifyContent: "center" }}>
          <Pressable
            style={{
              backgroundColor: "rgb(255, 59, 48)",
              borderRadius: 5,
              width: "100%",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleDelete}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditSprayWallScreen;

const styles = StyleSheet.create({
  addNewSprayWallContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  imageButton: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    fontSize: 16,
  },
  inputAndAddContainer: {
    alignSelf: "stretch",
  },
});
