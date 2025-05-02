import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import GoogleSignUpButton from "../../components/auth/GoogleSignUpButton";
import AppleSignUpButton from "../../components/auth/AppleSignUpButton";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import FacebookSignUpButton from "../../components/auth/FacebookSignUpButton";

const FONT_WEIGHT_HEADER_TITLE = "bold";
const FONT_WEIGHT_BUTTON_TITLE = "500";
const BUTTON_COLOR = "#E9ECE9";
const EMAIL_BUTTON_COLOR = "#124D15";

const LoginProvidersScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 15,
        }}
      >
        <View
          style={{
            height: "25%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/icon-transparent.png")}
            style={{ width: 100, height: 100 }}
            contentFit="contain"
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: FONT_WEIGHT_HEADER_TITLE,
            }}
          >
            Sign up or log in
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: FONT_WEIGHT_HEADER_TITLE,
            }}
          >
            to start creating
          </Text>
        </View>
        <AppleSignUpButton color={BUTTON_COLOR} />
        <GoogleSignUpButton color={BUTTON_COLOR} />
        <FacebookSignUpButton color={BUTTON_COLOR} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <Text style={{ paddingHorizontal: 10 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: EMAIL_BUTTON_COLOR,
            width: "100%",
            height: 44,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("AuthStack", { screen: "Email" })}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Continue with email
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginProvidersScreen;
