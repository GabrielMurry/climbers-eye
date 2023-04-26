import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { CameraIcon } from "react-native-heroicons/outline";

const imageScaleDownFactor = 10;

const AddNewSprayWallScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [sprayWallName, setSprayWallName] = useState("");

  useEffect(() => {
    if (route?.params?.image) {
      const { image } = route.params;
      setImage(image);
    }
  }, [route]);

  const handleAddSprayWall = () => {
    Alert.alert(
      "Add Spray Wall",
      `Are you sure you want to add "${sprayWallName}" to [Gym Name]?`,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add New Spray Wall</Text>
        <Text style={styles.subTitleText}>in [Gym Name]</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageButton(image, imageScaleDownFactor)}
          onPress={() =>
            navigation.navigate("Camera", { screen: "AddSprayWall" })
          }
        >
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={styles.image(image, imageScaleDownFactor)}
            />
          ) : (
            <View style={styles.imagePlaceholderContainer}>
              <CameraIcon size={30} color="black" />
              <Text style={styles.imagePlaceholderText}>Take a Picture</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputAndAddContainer}>
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
    </SafeAreaView>
  );
};

export default AddNewSprayWallScreen;

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
  imageContainer: {
    alignItems: "center",
  },
  imageButton: (image, imageScaleDownFactor) => ({
    width: image ? image.width / imageScaleDownFactor : "95%",
    height: image ? image.height / imageScaleDownFactor : 300,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  }),
  image: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
  }),
  imagePlaceholderContainer: {
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 16,
  },
  inputAndAddContainer: {
    alignItems: "center",
    paddingTop: 10,
    rowGap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    height: 45,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
