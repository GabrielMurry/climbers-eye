import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
  Alert,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";

const imageScaleDownFactor = 16;

const AddGymScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.userReducer);

  const [isCommercialGym, setIsCommercialGym] = useState(true);
  const [gymName, setGymName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [image, setImage] = useState({
    base64: null,
    width: null,
    height: null,
  });
  const [sprayWallName, setSprayWallName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route?.params?.image) {
      const { image } = route.params;
      setImage(image);
    }
  }, [route]);

  const handleAddGym = () => {
    Alert.alert(
      "Add Gym",
      `Are you sure you want to add "${gymName}" containing "${sprayWallName}"?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            const data = {
              gym: {
                name: gymName,
                type: isCommercialGym ? "commercial" : "home",
                location: gymLocation,
              },
              spraywall: {
                name: sprayWallName,
                spraywall_image_data: image.base64,
                spraywall_image_width: image.width,
                spraywall_image_height: image.height,
                gym: null,
              },
            };
            const response = await request("post", `add_gym/${userID}`, data);
            if (response.status !== 200) {
              console.log(response.status);
              setIsLoading(false);
              return;
            }
            navigation.navigate("Home");
            setIsLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

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
        base64: base64,
        width: width,
        height: height,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.addNewGymContainer}>
          <Text style={styles.title}>Add New Gym</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.label}>Select Gym Type:</Text>
            <View style={styles.switchesContainer}>
              <View style={styles.switch}>
                <Text style={styles.subLabel}>Commercial Gym</Text>
                <Switch
                  value={isCommercialGym}
                  onValueChange={() => setIsCommercialGym(!isCommercialGym)}
                />
              </View>
              <View style={styles.switch}>
                <Text style={styles.subLabel}>Non-Commercial Gym (Home)</Text>
                <Switch
                  value={!isCommercialGym}
                  onValueChange={() => setIsCommercialGym(!isCommercialGym)}
                />
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {isCommercialGym ? "Gym" : "Home"} Name:
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                isCommercialGym ? "Enter gym name" : "Enter home name"
              }
              value={gymName}
              onChangeText={(text) => setGymName(text)}
            />
          </View>
          <View style={styles.locationContainer(isCommercialGym)}>
            <Text style={styles.label}>Gym Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter gym address"
              value={gymLocation}
              onChangeText={(text) => setGymLocation(text)}
              editable={isCommercialGym}
            />
          </View>
        </View>
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
                  source={{ uri: "data:image/png;base64," + image.base64 }}
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
                    navigation.navigate("Camera", { screen: "AddGym" })
                  }
                >
                  <CameraIcon size={30} color="black" />
                  <Text style={styles.imageButtonText}>Take Picture of</Text>
                  <Text style={styles.imageButtonText}>Spray Wall</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={pickImage}
                >
                  <PhotoIcon size={30} color="black" />
                  <Text style={styles.imageButtonText}>Select Photo</Text>
                  <Text style={styles.imageButtonText}>From Album</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddGym}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.addButtonText}>
              Add {isCommercialGym ? "Gym" : "Home"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddGymScreen;

const styles = StyleSheet.create({
  addNewGymContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    gap: 15,
  },
  addNewSprayWallContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  typeContainer: {
    alignSelf: "stretch",
  },
  locationContainer: (isCommercialGym) => ({
    opacity: isCommercialGym ? 1 : 0.25,
    alignSelf: "stretch",
  }),
  inputContainer: {
    alignSelf: "stretch",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 16,
  },
  switchesContainer: {
    alignItems: "center",
    gap: 5,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
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
  image: (image, imageScaleDownFactor) => ({
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
  }),
  imageButtonText: {
    fontSize: 16,
  },
  inputAndAddContainer: {
    alignSelf: "stretch",
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
