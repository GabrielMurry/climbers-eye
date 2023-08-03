import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";

const WINDOW_WIDTH = Dimensions.get("window").width;
const BANNER_IMAGE_HEIGHT = 100;

const BannerScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  // const { gym } = useSelector((state) => state.gymReducer);
  // const [newGymName, setNewGymName] = useState(gym.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (newGymName !== gym.name) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [newGymName, gym.name]);

  // const handleSave = async () => {
  //   setIsLoading(true);
  //   const data = { name: newGymName };
  //   const response = await request("post", `edit_gym/${gym.id}`, data);
  //   if (response.status !== 200) {
  //     console.log(response.status);
  //     setIsLoading(false);
  //     return;
  //   }
  //   if (response.data) {
  //     dispatch(setGym(response.data.gym));
  //     setIsLoading(false);
  //     console.log("success!");
  //   }
  // };

  const handleUploadImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (result && !result.canceled) {
        let width = result.assets[0].width;
        let height = result.assets[0].height;
        let orientation = width > height ? "horizontal" : "vertical";
        let scale = orientation === "vertical" ? 8 : 5;
        let imageUri = "data:image/png;base64," + result.assets[0].base64;
        navigation.navigate("CropImage", {
          imageUri: imageUri,
          type: type,
          orientation: orientation,
          scale: scale,
          width: width,
          height: height,
          cropDimensions: {
            width:
              type === "banner"
                ? WINDOW_WIDTH
                : type === "headshot" && orientation === "vertical"
                ? width / scale
                : height / scale,
            height:
              type === "banner"
                ? BANNER_IMAGE_HEIGHT
                : type === "headshot" && orientation === "vertical"
                ? width / scale
                : height / scale,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      {/* Header arrow and title */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            marginLeft: 5,
            marginTop: 5,
          }}
        >
          <ArrowLeftCircleIcon
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              alignItems: "center",
              marginLeft: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 24 }}>Banner Image</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 10 }}>
          <Text>Banner Image</Text>
          <TouchableOpacity
            style={{
              width: 360,
              height: 100,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "lightblue",
            }}
            onPress={() => handleUploadImage("banner")}
          >
            {/* <Image source={{uri: }} /> */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            // disabled={isDisabled}
            // onPress={handleSave}
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

export default BannerScreen;

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
