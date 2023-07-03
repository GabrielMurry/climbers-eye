import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";
import { useSelector } from "react-redux";

const AddNewSprayWallScreen = ({ navigation, route }) => {
  const { gymID } = useSelector((state) => state.gymReducer);
  const [sprayWallName, setSprayWallName] = useState("");
  const [image, setImage] = useState({
    base64: null,
    width: null,
    height: null,
  });

  useEffect(() => {
    if (route?.params?.image) {
      const { image } = route.params;
      setImage({
        base64: "data:image/png;base64," + image.base64,
        width: image.width,
        height: image.height,
      });
    }
  }, [route]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (result && !result.canceled) {
      const { base64, width, height } = result.assets[0];
      setImage({
        base64: "data:image/png;base64," + base64,
        width: width,
        height: height,
      });
    }
  };

  const handleAddNewSprayWall = async () => {
    const data = {
      name: sprayWallName,
      spraywall_image_data: image.base64.split(",")[1],
      spraywall_image_width: image.width,
      spraywall_image_height: image.height,
    };
    const response = await request("post", `add_new_spraywall/${gymID}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    console.log("successfully added spraywall!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.addNewSprayWallContainer}>
        <View style={styles.inputAndAddContainer}>
          <Text style={styles.label}>Spray Wall Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter spray wall name"
            value={sprayWallName}
            onChangeText={(text) => setSprayWallName(text)}
          />
        </View>
        <View style={styles.imageContainer}>
          {image.base64 ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: image.base64 }}
                style={{
                  flex: 1,
                }}
                resizeMode="contain"
              />
              <View style={{ justifyContent: "space-evenly", padding: 10 }}>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("Camera", { screen: "AddGym" })
                  }
                >
                  <CameraIcon size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={pickImage}
                >
                  <PhotoIcon size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() =>
                  navigation.navigate("Camera", { screen: "AddNewSprayWall" })
                }
              >
                <CameraIcon size={30} color="black" />
                <Text style={styles.imageButtonText}>Take Picture of</Text>
                <Text style={styles.imageButtonText}>Spray Wall</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <PhotoIcon size={30} color="black" />
                <Text style={styles.imageButtonText}>Select Photo</Text>
                <Text style={styles.imageButtonText}>From Album</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <Pressable
          style={{
            backgroundColor: "rgb(0, 122, 255)",
            borderRadius: 5,
            width: "100%",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleAddNewSprayWall}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Add
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddNewSprayWallScreen;

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
