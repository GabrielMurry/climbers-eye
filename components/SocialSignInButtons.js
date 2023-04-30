import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const SocialSignInButtons = () => {
  const handleLoginFacebook = () => {};

  const handleLoginGoogle = () => {};

  const handleLoginApple = () => {};

  return (
    <>
      <CustomButton
        onPress={handleLoginFacebook}
        text="Login with Facebook"
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        onPress={handleLoginGoogle}
        text="Login with Google"
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        onPress={handleLoginApple}
        text="Login with Apple"
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
