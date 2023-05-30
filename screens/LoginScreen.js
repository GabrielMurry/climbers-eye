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
import { request } from "../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setUserID } from "../redux/actions";

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userReducer);

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = { username, password };
    const response = await request("post", "login/", data);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      // in dispatch, we enter the action "setUserID" along with the "userID" value (doing this for username also)
      dispatch(setUserID(response.data.userID));
      // for redundancy. If user signs up, but restarts the app, then logs in, they still don't belong to a gym or spraywall, so redirect to Map screen
      if (response.data.gymID) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Map");
      }
    }
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
        setValue={(value) => dispatch(setUsername(value))}
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
