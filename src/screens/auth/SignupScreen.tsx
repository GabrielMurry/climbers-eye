import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../utils/styles";
import { signupUser } from "../../services/auth";
import { setUser } from "../../redux/features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";
import CommonTextInput from "../../components/common/CommonTextInput";

const SignupScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

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
      password: password,
    };
    const response = await signupUser(data);
    if (response.status !== 201) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      // in dispatch, we enter the action "setUserID" along with the "userID" value (doing this for username also)
      dispatch(setUser(response.data.user));
    }
    // navigation.navigate("TabsStack", { screen: "MapStack" });
    setIsLoading(false);
  };

  const handleTermsAndConditions = () => {
    navigation.navigate("AuthStack", { screen: "TermsAndConditions" });
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate("AuthStack", { screen: "PrivacyPolicy" });
  };

  const handleLogin = () => {
    navigation.navigate("AuthStack", { screen: "Login" });
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
          height: 150,
          justifyContent: "center",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/icon-transparent.png")}
          style={{ width: "50%", height: "50%" }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>Create Account</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 350,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <CommonTextInput
          setValue={setUsername}
          value={username}
          title="Username"
        />
        <CommonTextInput
          setValue={setEmail}
          value={email}
          title="Email"
          behavior="email"
        />
        <CommonTextInput
          setValue={setPassword}
          value={password}
          title="Password"
        />
        <CommonTextInput
          setValue={setPasswordRepeat}
          value={passwordRepeat}
          title="Re-Enter Password"
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <CommonSubmitButton onPress={handleCreateAccount} title="CREATE" />
        </View>
      </View>
      {/* <AppleSignUpButton />
      <GoogleSignUpButton /> */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          flexWrap: "wrap",
        }}
      >
        <Text style={{ color: "gray" }}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={handleTermsAndConditions}>
          <Text style={styles.link}>Terms and Conditions </Text>
        </TouchableOpacity>
        <Text style={{ color: "gray" }}>and </Text>
        <TouchableOpacity onPress={handlePrivacyPolicy}>
          <Text style={styles.link}>Privacy Policy.</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <TouchableOpacity>
          <Text style={styles.link} onPress={handleTermsOfUse}>
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        <Text>and</Text>
        <Text style={styles.link} onPress={handlePrivacyPolicy}>
          Privacy Policy
        </Text>
      </Text> */}

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
