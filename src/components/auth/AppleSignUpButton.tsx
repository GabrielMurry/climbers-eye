import { View, Text, StyleSheet } from "react-native";
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

const AppleSignUpButton = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            axios
              .post("http://192.168.50.195:8000/auth/apple/", {
                identityToken: credential.identityToken,
                firstName: credential.fullName?.givenName,
                lastName: credential.fullName?.familyName,
              })
              .then(async (res) => {
                console.log("good!");
                console.log(res.data);
                // Set tokens
                await SecureStore.setItemAsync(
                  "accessToken",
                  res.data.accessToken
                );
                await SecureStore.setItemAsync(
                  "refreshToken",
                  res.data.refreshToken
                );
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
        }}
      />
    </View>
  );
};

export default AppleSignUpButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
});
