import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";
import { useOptions } from "../../hooks/useOptions";
import OptionsIcon from "../common/header/OptionsIcon";
import { useModalOptions } from "../../contexts/ModalOptionsContext";
import { logoutUser } from "../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { selectUser } from "../../redux/features/user/userSelectors";
import { useAppSelector } from "../../redux/hooks";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import { UserIcon } from "react-native-heroicons/outline";

const ProfileHeader = () => {
  const navigation = useNavigation();

  const user = useAppSelector((state) => selectUser(state));

  const { closeModal } = useModalOptions();

  const handleLogoutPress = async () => {
    closeModal();
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const data = { refresh: refreshToken };
    const response = await logoutUser(data);
    if (response.status === 200) {
      // Clear tokens from storage
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      // Reset the navigation stack and navigate to the login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: "AuthStack", state: { routes: [{ name: "Login" }] } },
          ],
        })
      );
    }
  };

  const handleEditProfilePress = () => {
    closeModal();
    navigation.navigate("ProfileStack", { screen: "EditProfile" });
  };

  const { options } = useOptions([
    {
      title: "Edit Profile",
      onPress: handleEditProfilePress,
      color: "black",
    },
    { title: "Log out", onPress: handleLogoutPress, color: "red" },
  ]);

  const userIcon = (
    <>
      {user.profilePicUrl ? (
        <Pressable>
          <Image source={user.profilePicUrl} />
        </Pressable>
      ) : (
        <UserIcon size={50} color={"black"} />
      )}
    </>
  );

  return (
    <Header
      leftIcon={userIcon}
      leftText={user.username}
      rightIcon={<OptionsIcon options={options} />}
    />
  );
};

export default ProfileHeader;
