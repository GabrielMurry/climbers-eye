import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/general/Header";
import SettingsButton from "../../../components/editGymComponents/SettingsButton";
import { useDispatch, useSelector } from "react-redux";
import { setHeadshotImage } from "../../../redux/actions";
import { request } from "../../../api/requestMethods";
import * as ImagePicker from "expo-image-picker";
import useCustomHeader from "../../../hooks/useCustomHeader";

const EditProfileScreen = ({ navigation, route }) => {
  const { user, headshotImage } = useSelector((state) => state.userReducer);

  const handleUploadImage = async () => {
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
        let imageUri = "data:image/png;base64," + result.assets[0].base64;
        navigation.navigate("CropImage", {
          imageUri: imageUri,
          width: width,
          height: height,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Profile",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      {/* <Header navigation={navigation} title={"Edit Profile"} /> */}
      {/* profile settings */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* profile images */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}>Profile</Text>
        </View>
        <View style={{ backgroundColor: "white", borderRadius: 5 }}>
          <SettingsButton
            imageUrl={headshotImage.url ? headshotImage.url : "default"}
            onPress={handleUploadImage}
          />
          <SettingsButton
            title={"Name"}
            placeHolder={user?.name}
            onPress={() => navigation.navigate("EditName")}
          />
          <SettingsButton
            title={"Username"}
            placeHolder={`@${user?.username}`}
          />
          <SettingsButton title={"Email"} placeHolder={user?.email} />
        </View>
        {/* delete gym */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 14, color: "red" }}>Delete</Text>
        </View>
        <View
          style={{
            backgroundColor: "red",
            borderRadius: 5,
          }}
        >
          <SettingsButton
            title={"Delete Profile"}
            textColor={"white"}
            destructive={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
