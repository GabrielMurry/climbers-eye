import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { request } from "../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setUserID } from "../redux/actions";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    setIsLoading(true);
    const data = {
      username,
      email,
      password1: password,
      password2: passwordRepeat,
    };
    const response = await request("post", "signup/", data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      // in dispatch, we enter the action "setUserID" along with the "userID" value (doing this for username also)
      console.log(response.data);
      console.log(response.data.userID);
      dispatch(setUserID(response.data.userID));
    }
    navigation.navigate("Map");
    setIsLoading(false);
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
        setValue={(value) => dispatch(setUsername(value))}
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
      <CustomButton
        onPress={handleCreateAccount}
        text="Create Account"
        isLoading={isLoading}
      />

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
