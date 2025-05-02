import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";

enum EmailErrors {
  Invalid = "Email address is invalid.",
  Blank = "Email address is required.",
}

const EmailScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<EmailErrors | null>(null);

  const isInvalidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setError(EmailErrors.Invalid);
      return true;
    }
    return false;
  };

  const isBlankEmail = () => {
    if (email === "") {
      setError(EmailErrors.Blank);
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Reset errors
    if (error) {
      setError(null);
    }
  }, [email]);

  const submitEmail = async () => {
    // Check for errors
    if (isBlankEmail() || isInvalidEmail()) {
      return;
    }
    axios
      .post(`${BASE_URL}/auth/check_email/`, { email })
      .then((res) => {
        const emailExists: boolean = res.data.exists;
        navigation.navigate("AuthStack", {
          screen: "Password",
          params: { isLoggingIn: emailExists, email: email },
        });
      })
      .catch((err) => {
        console.log("Login failed", err.message); // should say 'Network Error'
        console.log("Error config:", err.config);
        console.log("Error request:", err.request); // useful: might show failed URL
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Let's start with email
          </Text>
        </View>
        <View style={{ gap: 50 }}>
          <CommonTextInput
            value={email}
            setValue={setEmail}
            title="Email"
            error={error}
            behavior="email"
          />
          <CommonSubmitButton onPress={submitEmail} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;
