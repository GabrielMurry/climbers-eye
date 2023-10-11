import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { request } from "../api/requestMethods";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import SVGImg from "../assets/ClimbersEyeLogoShapesTest3.svg";
import { colors } from "../utils/styles";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
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
      dispatch(setUser(response.data.user));
    }
    navigation.navigate("Tabs", { screen: "Map" });
    setIsLoading(false);
  };

  const handleTermsOfUse = () => {};

  const handlePrivacyPolicy = () => {};

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (username.includes(" ")) {
      console.log("Username cannot contain spaces.");
    } else if (username !== username.toLowerCase()) {
      console.log("Username cannot contain capital letters.");
    }
  }, [username]);

  // const handleUsernameChange = (newUsername) => {
  //   // Check for spaces in the username
  //   if (newUsername.includes(" ")) {
  //     console.log("Username cannot contain spaces.");
  //   }
  //   // Check for capital letters in the username
  //   else if (newUsername !== newUsername.toLowerCase()) {
  //     setErrorMessage("Username cannot contain capital letters.");
  //   } else {
  //     setErrorMessage("");
  //   }
  //   setUsername(newUsername);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>Create Account</Text>
        <SVGImg width={"100%"} height={50} />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flex: 2,
          justifyContent: "center",
          gap: 10,
        }}
      >
        <CustomInput
          value={username}
          setValue={(value) => setUsername(value)}
          placeholder="Username"
          secureTextEntry={false}
          width="90%"
          autoCapitalize="none"
        />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="Email"
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
        <CustomInput
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          placeholder="Re-Enter Password"
          secureTextEntry={true}
          width="90%"
        />
        <CustomButton
          onPress={handleCreateAccount}
          text="Create Account"
          isLoading={isLoading}
          width="90%"
        />
      </View>

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

      {/* <SocialSignInButtons /> */}
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            height: 50,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
