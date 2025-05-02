import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";
import axios from "axios";
import { BASE_URL } from "@env";

type PasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Password"
>;

const PasswordScreen: React.FC<PasswordScreenProps> = ({ route }) => {
  const { isLoggingIn, email } = route.params;
  const navigation = useNavigation();

  const [password, setPassword] = useState("");

  const submitPassword = async () => {
    if (isLoggingIn) {
      axios
        .post(`${BASE_URL}/auth/login/`, { email, password })
        .then((res) => {
          // if correct password, get tokens and set redux
          // else, indicate incorrect password
        })
        .catch((err) => {
          console.log("Login failed", err.message); // should say 'Network Error'
          console.log("Error config:", err.config);
          console.log("Error request:", err.request); // useful: might show failed URL
        });
    } else {
      navigation.navigate("AuthStack", {
        screen: "Username",
        params: { email, password },
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Password</Text>
        </View>
        <View style={{ gap: 50 }}>
          <CommonTextInput
            value={password}
            setValue={setPassword}
            title="Password"
          />
          <CommonSubmitButton onPress={submitPassword} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;
