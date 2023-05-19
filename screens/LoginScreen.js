import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import axios from "../api/axios";
import configToken from "../api/configToken";

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Your authentication code here
    axios
      .post("/login/", { username, password }, await configToken)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("Home");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.logo, { height: height * 0.3 }]}>SPRAY</Text>
      <CustomInput
        value={username}
        setValue={setUsername}
        placeholder="Username"
        secureTextEntry={false}
      />
      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <CustomButton onPress={handleLogin} text="Login" />
      <CustomButton
        onPress={handleForgotPassword}
        text="Forgot password?"
        type="TERTIARY"
      />
      <SocialSignInButtons />
      <CustomButton
        onPress={handleCreateAccount}
        text="Don't have an account? Create one"
        type="TERTIARY"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    // width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    fontSize: 100,
  },
});

export default LoginScreen;
