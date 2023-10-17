import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {
  ArrowLongRightIcon,
  EnvelopeIcon,
} from "react-native-heroicons/outline";
import { colors } from "../utils/styles";
import SVGImg from "../assets/ClimbersEyeLogoShapes.svg";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSendConfirmationCode = () => {
    navigation.navigate("SubmitCode");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSendPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "25%",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>Reset Password</Text>
        <SVGImg width={"100%"} height={50} />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          height: "75%",
          gap: 25,
        }}
      >
        <CustomInput
          value={email}
          setValue={(value) => setEmail(value)}
          placeholder="Email"
          secureTextEntry={false}
          width="90%"
          autoCapitalize="none"
          icon={<EnvelopeIcon size={20} color={colors.textInputDark} />}
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <CustomButton
            onPress={handleSendPress}
            text="SEND"
            isLoading={isLoading}
            width="50%"
            bgColor={colors.primary}
            icon={<ArrowLongRightIcon size={25} color={"white"} />}
          />
        </View>
        {hasError ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "red" }}>
              Username or password is incorrect.
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
});

export default ForgotPasswordScreen;
