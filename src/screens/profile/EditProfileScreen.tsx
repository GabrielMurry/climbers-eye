import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import SettingsButton from "../../components/common/settings/SettingsButton";
import { updateProfileInfo } from "../../services/profile";
import { updateUser } from "../../redux/features/user/userSlice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import EditProfileHeader from "../../components/profile/EditProfileHeader";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState<object[]>([]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return false;
    }
    return true;
  };

  const handleUploadImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
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
        navigation.navigate("ProfileStack", {
          screen: "CropImage",
          params: {
            imageUri: imageUri,
            width: width,
            height: height,
            isPortrait: isPortrait,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
  };

  const handleDeleteProfilePic = async () => {
    const data = {
      profilePicUrl: null,
      profilePicWidth: null,
      profilePicHeight: null,
    };
    const response = await updateProfileInfo(data);
    dispatch(updateUser(response.data));
    setIsModalVisible(false);
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with options
      const options = [
        { title: "Choose Photo", onPress: handleUploadImage },
        { title: "Take Photo", onPress: handleUploadImage },
        {
          title: "Delete Photo",
          onPress: handleDeleteProfilePic,
          color: "red",
        },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      return options;
    };

    setOptionsData(createOptionsData());
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <EditProfileHeader />
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
            imageUrl={user?.profilePicUrl ? user?.profilePicUrl : "default"}
            onPress={() => setIsModalVisible(true)}
          />
          <SettingsButton
            title={"Name"}
            placeHolder={user?.name}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "EditName" })
            }
          />
          <SettingsButton
            title={"Username"}
            placeHolder={`@${user?.username}`}
            onPress={() => null}
          />
          <SettingsButton
            title={"Email"}
            placeHolder={user?.email}
            onPress={() => null}
          />
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
            onPress={() => null}
          />
        </View>
      </View>
      {/* <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      /> */}
    </SafeAreaView>
  );
};

export default EditProfileScreen;
