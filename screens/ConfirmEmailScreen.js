import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";

const ConfirmEmailScreen = ({ navigation }) => {
  const [code, setCode] = useState("");

  const handleConfirm = () => {
    navigation.navigate("Home");
  };

  const handleResendCode = () => {};

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Confirm Your Email</Text>
      <CustomInput
        value={code}
        setValue={setCode}
        placeholder="Enter Your Confirmation Code"
        secureTextEntry={false}
      />
      <CustomButton onPress={handleConfirm} text="Confirm" />

      <CustomButton
        onPress={handleResendCode}
        text="Resend Code"
        type="SECONDARY"
      />

      <CustomButton
        onPress={handleLogin}
        text="Back to Login"
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

export default ConfirmEmailScreen;
