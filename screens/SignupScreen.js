import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleCreateAccount = () => {
    // Your authentication code here
    navigation.navigate("ConfirmEmail");
  };

  const handleTermsOfUse = () => {};

  const handlePrivacyPolicy = () => {};

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <CustomInput
        value={username}
        setValue={setUsername}
        placeholder="Username"
        secureTextEntry={false}
      />
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder="Email"
        secureTextEntry={false}
      />
      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <CustomInput
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        placeholder="Re-Enter Password"
        secureTextEntry={true}
      />
      <CustomButton onPress={handleCreateAccount} text="Create Account" />

      <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <Text style={styles.link} onPress={handleTermsOfUse}>
          Terms of Use
        </Text>{" "}
        and{" "}
        <Text style={styles.link} onPress={handlePrivacyPolicy}>
          Privacy Policy
        </Text>
      </Text>

      <SocialSignInButtons />

      <CustomButton
        onPress={handleLogin}
        text="Already have an account? Login"
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
    width: "90%",
  },
  link: {
    color: "#fd8075",
  },
});

export default SignupScreen;
