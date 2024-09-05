import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import SettingsButton from "../../../components/SettingsButton";
import { useDispatch, useSelector } from "react-redux";
import { setHeadshotImage } from "../../../redux/actions";
import { request } from "../../../api/requestMethods";
import * as ImagePicker from "expo-image-picker";
import useCustomHeader from "../../../hooks/useCustomHeader";
import ModalOptions from "../../../components/ModalOptions";

const EditProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user, headshotImage } = useSelector((state) => state.userReducer);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState([]);

  const handleUploadImage = async () => {
    setIsModalVisible(false);
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
        let isPortrait = height > width ? true : false;
        navigation.navigate("CropImage", {
          imageUri: imageUri,
          width: width,
          height: height,
          isPortrait: isPortrait,
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

  const removeHeadshotPhoto = () => {
    dispatch(setHeadshotImage({}));
    setIsModalVisible(false);
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with options
      const options = [
        { title: "Choose From Library", onPress: handleUploadImage },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      // If you are the setter of a boulder, give option to delete boulder
      if (headshotImage.url) {
        const removeHeadshotOption = {
          title: "Remove Photo",
          onPress: removeHeadshotPhoto,
          color: "red",
        };
        const cancelOptionIndex = options.length - 1;
        options.splice(cancelOptionIndex, 0, removeHeadshotOption);
      }

      return options;
    };

    setOptionsData(createOptionsData());
  }, [headshotImage]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      {/* profile settings */}
      <View style={{ paddingHorizontal: 10 }}>
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
            onPress={() => setIsModalVisible(true)}
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
        {/* delete profile */}
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
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
