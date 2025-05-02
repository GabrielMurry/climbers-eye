import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../../redux/hooks";
import { setIsSignedIn, setUser } from "../../redux/features/user/userSlice";
import { removeGym } from "../../redux/features/gym/gymSlice";
import { removeSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { BASE_URL, GOOGLE_IOS_CLIENT_ID } from "@env";
import { Image } from "expo-image";

type GoogleSignUpButtonProps = {
  color: string;
};

GoogleSignin.configure({
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({
  color = "white",
}) => {
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      axios
        .post(`${BASE_URL}/auth/google/`, {
          identityToken: response.data?.idToken,
          firstName: response.data?.user.givenName,
          lastName: response.data?.user.familyName,
        })
        .then(async (res) => {
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
          if (response.type === "cancelled") {
            return;
          }
          console.log("Login failed", err.message); // should say 'Network Error'
          console.log("Error config:", err.config);
          console.log("Error request:", err.request); // useful: might show failed URL
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
          source={require("../../assets/images/google_icon.png")}
          style={{ width: 30, height: 30, position: "absolute", left: 20 }}
          contentFit="contain"
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleSignUpButton;
