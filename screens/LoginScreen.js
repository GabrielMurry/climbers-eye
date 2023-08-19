import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { request } from "../api/requestMethods";
import { useDispatch } from "react-redux";
import {
  setUser,
  setGym,
  setSpraywalls,
  setHeadshotImage,
} from "../redux/actions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const data = { username, password };
    const response = await request("post", "login/", data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      // in dispatch, we enter the action "setUserID" along with the "userID" value (doing this for username also)
      dispatch(setUser(response.data.user));
      dispatch(setHeadshotImage(response.data.headshotImage));
      // for redundancy. If user signs up, but restarts the app, then logs in, they still don't belong to a gym or spraywall, so redirect to Map screen
      if (response.data.gym) {
        dispatch(setGym(response.data.gym));
        dispatch(setSpraywalls(response.data.spraywalls));
        navigation.navigate("Tabs");
      } else {
        navigation.navigate("Map");
      }
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          height: height * 0.25,
        }}
      >
        <Text style={styles.logo}>SPRAY</Text>
      </View>
      <CustomInput
        value={username}
        setValue={(value) => setUsername(value)}
        placeholder="Username"
        secureTextEntry={false}
        width="90%"
      />
      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        width="90%"
      />
      <CustomButton
        onPress={handleLogin}
        text="Login"
        isLoading={isLoading}
        width="90%"
      />
      <CustomButton
        onPress={handleForgotPassword}
        text="Forgot password?"
        type="TERTIARY"
        width="90%"
      />
      <SocialSignInButtons />
      <CustomButton
        onPress={handleCreateAccount}
        text="Don't have an account? Create one"
        type="TERTIARY"
        width="90%"
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
