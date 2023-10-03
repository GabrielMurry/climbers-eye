import {
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../../api/requestMethods";
import { setGym, setSpraywalls } from "../../redux/actions";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import EditData from "../EditData";

export const GymType = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [isCommercialGym, setIsCommercialGym] = useState(
    gym.type === "commercial"
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newType = isCommercialGym ? "commercial" : "home";
    if (newType !== gym.type) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isCommercialGym, gym.type]);

  const handleSave = async () => {
    setIsLoading(true);
    const newType = isCommercialGym ? "commercial" : "home";
    const data = { type: newType };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Commercial Gym
              </Text>
              <Switch
                value={isCommercialGym}
                onValueChange={() => setIsCommercialGym(!isCommercialGym)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Non-Commercial Gym (Home)
              </Text>
              <Switch
                value={!isCommercialGym}
                onValueChange={() => setIsCommercialGym(!isCommercialGym)}
              />
            </View>
          </View>
          <EditData
            description={
              'Choosing "Commercial Gym" requires an address of the gym. "Home Gym" remains private.'
            }
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            disabled={isDisabled}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const GymName = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymName, setNewGymName] = useState(gym.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const CHAR_LIMIT = 50;

  useEffect(() => {
    if (newGymName !== gym.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymName, gym.name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newGymName };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <EditData
          text={newGymName}
          setText={setNewGymName}
          description={"Gym name to be displayed to all users."}
          charLimit={CHAR_LIMIT}
        />
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            disabled={isDisabled}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const GymLocation = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymLocation, setNewGymLocation] = useState(gym.location);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const CHAR_LIMIT = 100;

  useEffect(() => {
    if (newGymLocation !== gym.location) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymLocation, gym.location]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { location: newGymLocation };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <EditData
          text={newGymLocation}
          setText={setNewGymLocation}
          description={"Gym location (address) to be displayed to all users."}
          charLimit={CHAR_LIMIT}
        />
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            disabled={isDisabled}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const SprayWallName = ({ spraywall, navigation }) => {
  const dispatch = useDispatch();
  const [newSprayWallName, setNewSprayWallName] = useState(spraywall.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newSprayWallName !== spraywall.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newSprayWallName, spraywall.name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newSprayWallName };
    const response = await request(
      "post",
      `edit_spraywall/${spraywall.id}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setSpraywalls(response.data.spraywalls));
      setIsLoading(false);
      console.log("success!");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>Spray Wall Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          value={newSprayWallName}
          onChangeText={(text) => setNewSprayWallName(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const SprayWallImage = ({ spraywall, navigation, image }) => {
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();
  const [newImage, setNewImage] = useState(image);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNewImage(image);
  }, [image]);

  useEffect(() => {
    if (newImage.url) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newImage, spraywall.url]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = newImage;
    const response = await request(
      "post",
      `edit_spraywall/${spraywall.id}`,
      data
    );
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setSpraywalls(response.data.spraywalls));
      setIsLoading(false);
      console.log("success!");
      navigation.goBack();
    }
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
      setNewImage({
        url: "data:image/png;base64," + base64,
        width: width,
        height: height,
      });
    }
  };

  const handleImagePress = async () => {
    let options = ["Take a photo", "Choose from library", "Cancel"];
    let destructiveButtonIndex = -1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.navigate("Camera", {
              screen: "Edit",
              item: { title: "Spray Wall Image", spraywall },
            });
            break;

          case 1:
            pickImage();
            break;

          case destructiveButtonIndex:
            // Delete
            deleteBoulder();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={handleImagePress}>
        <Image
          source={{ uri: newImage.url ?? spraywall.url }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </Pressable>
      <View>
        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#888",
  },
});
