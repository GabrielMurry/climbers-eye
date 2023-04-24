import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const AddNewSprayWallScreen = () => {
  const [image, setImage] = useState(null);
  const [sprayWallName, setSprayWallName] = useState("");
  const navigation = useNavigation();

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddSprayWall = () => {
    Alert.alert(
      "Add Spray Wall",
      `Are you sure you want to add "${sprayWallName}" as a new spray wall?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Spray Wall</Text>
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.imageWrapper}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <Text style={styles.imagePlaceholder}>Take a picture</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        value={sprayWallName}
        onChangeText={(text) => setSprayWallName(text)}
        placeholder="Enter spray wall name"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddSprayWall}>
        <Text style={styles.buttonText}>Add Spray Wall</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  imagePlaceholder: {
    fontSize: 18,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewSprayWallScreen;
