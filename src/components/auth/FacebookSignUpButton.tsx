import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";
import { Image } from "expo-image";

type FacebookSignUpButtonProps = {
  color: string;
};

Settings.initializeSDK();

const FacebookSignUpButton: React.FC<FacebookSignUpButtonProps> = ({
  color,
}) => {
  async function loginWithFacebook() {
    try {
      // Request permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        console.log("User cancelled the login process");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log("Something went wrong obtaining access token");
        return;
      }

      console.log("Access token:", data.accessToken);

      fetchFacebookUserData(data.accessToken);
    } catch (error) {
      console.log("Login fail with error: " + error);
    }
  }

  async function fetchFacebookUserData(token: string) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
      );
      const userData = await response.json();
      console.log("User data:", userData);

      // Example response:
      // { id: '123456', name: 'John Doe', email: 'john.doe@example.com' }

      // Now you can send this data to your backend or save it locally.
    } catch (error) {
      console.log("Error fetching Facebook user data: ", error);
    }
  }

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 50,
        borderRadius: 100,
        backgroundColor: color,
        justifyContent: "center",
      }}
      onPress={loginWithFacebook}
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
          source={require("../../assets/images/facebook_icon.png")}
          style={{ width: 25, height: 25, position: "absolute", left: 20 }}
          contentFit="contain"
        />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Continue with Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FacebookSignUpButton;
