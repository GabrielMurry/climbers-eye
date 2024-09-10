import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInput from "../../components/custom/CustomInput";
import CustomButton from "../../components/custom/CustomButton";

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Home");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <CustomInput
        value={newPassword}
        setValue={setNewPassword}
        placeholder="Enter Your New Password"
        secureTextEntry={false}
      />
      <CustomInput
        value={newPasswordRepeat}
        setValue={setNewPasswordRepeat}
        placeholder="Re-Enter Your New Password"
        secureTextEntry={false}
      />
      <CustomButton onPress={handleSubmit} text="Submit" />

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

export default ResetPasswordScreen;
