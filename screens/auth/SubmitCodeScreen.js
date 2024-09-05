import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const SubmitCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState("");

  const handleSubmitCode = () => {
    navigation.navigate("ResetPassword");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <CustomInput
        value={code}
        setValue={setCode}
        placeholder="Code"
        secureTextEntry={false}
      />
      <CustomButton onPress={handleSubmitCode} text="Submit" />
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

export default SubmitCodeScreen;
