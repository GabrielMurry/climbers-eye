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
  ActivityIndicator,
} from "react-native";
// import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import { request } from "../../api/requestMethods";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import useCustomHeader from "../../hooks/useCustomHeader";
import { setGym, setSpraywalls } from "../../redux/actions";
import { CommonActions } from "@react-navigation/native";

const AddGymScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.userReducer);

  const [isCommercialGym, setIsCommercialGym] = useState(true);
  const [gymName, setGymName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  // const [image, setImage] = useState({
  //   url: null,
  //   width: null,
  //   height: null,
  // });
  // const [sprayWallName, setSprayWallName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useCustomHeader({
    navigation,
    title: "Add New Gym",
  });

  const handleAddGym = () => {
    Alert.alert(
      "Add Gym",
      `Are you sure you want to add "${gymName}""?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            const data = {
              name: gymName,
              type: isCommercialGym ? "commercial" : "home",
              location: gymLocation,
            };
            // spraywall: {
            //   name: sprayWallName,
            //   image_data: image.url.split(",")[1],
            //   image_width: image.width,
            //   image_height: image.height,
            // },
            const response = await request("post", `api/gym_list/`, data);
            if (response.status === 201) {
              dispatch(setGym(response.data));
              dispatch(setSpraywalls([]));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0, // This sets "Home" as the first screen in the stack
                  routes: [{ name: "Tabs" }], // Define the route to the "Home" screen
                })
              );
            } else {
              console.log(response.status);
            }
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
        url: "data:image/png;base64," + base64,
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
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={styles.addNewGymContainer}>
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
        {/* <View style={styles.addNewSprayWallContainer}>
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
            {image.url ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: image.url }}
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
        </View> */}
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
