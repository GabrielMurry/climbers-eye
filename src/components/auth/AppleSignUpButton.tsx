import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { appleSignup } from "../../services/auth";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../../redux/hooks";
import { setIsSignedIn, setUser } from "../../redux/features/user/userSlice";
import { removeGym, setGym } from "../../redux/features/gym/gymSlice";
import {
  removeSpraywalls,
  setSpraywalls,
} from "../../redux/features/spraywall/spraywallSlice";
import { Gym } from "../../utils/types/gym";
import { BASE_URL } from "@env";
import { Image } from "expo-image";

type AppleSignUpButtonProps = {
  color: string;
};

const AppleSignUpButton: React.FC<AppleSignUpButtonProps> = ({
  color = "white",
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      axios
        .post(`${BASE_URL}/auth/apple/`, {
          identityToken: credential.identityToken,
          firstName: credential.fullName?.givenName,
          lastName: credential.fullName?.familyName,
        })
        .then(async (res) => {
          console.log("good!");
          console.log(res.data);
          // Set tokens
          await SecureStore.setItemAsync("accessToken", res.data.accessToken);
          await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
          await SecureStore.setItemAsync("csrfToken", res.data.csrfToken);
          // Set user
          const user = res.data.user;
          const userInfo = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            profilePicUrl: user.profilePicUrl,
            profilePicWidth: user.profilePicWidth,
            profilePicHeight: user.profilePicHeight,
            logbookCount: user.logbookCount,
            likesCount: user.likesCount,
            bookmarksCount: user.bookmarksCount,
            creationsCount: user.creationsCount,
          };
          dispatch(setUser(userInfo));
          dispatch(removeGym());
          dispatch(removeSpraywalls());
          dispatch(setIsSignedIn(true));
        })
        .catch((err) => {
          console.log("Login failed", err.message); // should say 'Network Error'
          console.log("Error config:", err.config);
          console.log("Error request:", err.request); // useful: might show failed URL
        });
      // signed in
    } catch (e) {
      console.error(e);
      // if (e.code === 'ERR_REQUEST_CANCELED') {
      //   // handle that the user canceled the sign-in flow
      // } else {
      //   // handle other errors
      // }
    }
  };

  return (
    // <AppleAuthentication.AppleAuthenticationButton
    //   buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
    //   buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
    //   cornerRadius={100}
    //   style={styles.button}
    //   onPress={signIn}
    // />
    <TouchableOpacity
      style={{
        width: "100%",
        height: 50,
        borderRadius: 100,
        backgroundColor: color,
        justifyContent: "center",
      }}
      onPress={signIn}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={require("../../assets/images/apple_icon.png")}
          style={{ width: 25, height: 25, position: "absolute", left: 20 }}
          contentFit="contain"
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Continue with Apple
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppleSignUpButton;

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
  },
});
