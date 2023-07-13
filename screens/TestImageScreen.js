import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { setSpraywalls } from "../redux/actions";

const TestImageScreen = () => {
  const [image, setImage] = useState({
    base64: null,
    width: null,
    height: null,
  });
  const [url, setUrl] = useState();

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

  const handlePress = async () => {
    const data = { image_data: image.base64.split(",")[1], id: 7 };
    const response = await request("post", "testing/", data);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setUrl(response.data.image_url);
    }
  };

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <Text>TestImageScreen</Text>
      <View style={{ width: "100%", height: 500 }}>
        <Image
          source={{
            uri: url,
          }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
        />
      </View>
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
      ></TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 150,
          height: 50,
          backgroundColor: "lightblue",
          marginTop: 25,
        }}
        onPress={handlePress}
      >
        <Text>Press Me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TestImageScreen;
