import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { request } from "../../api/requestMethods";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import SVGImg from "../../assets/ClimbersEyeLogoShapes.svg";
import { colors } from "../../utils/styles";
import {
  ArrowLongRightIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";

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
      password: password,
    };
    const response = await request("post", "api/signup/", data);
    if (response.status !== 201) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      console.log(response);
      // in dispatch, we enter the action "setUserID" along with the "userID" value (doing this for username also)
      dispatch(setUser(response.data.user));
    }
    navigation.navigate("Tabs", { screen: "Map" });
    setIsLoading(false);
  };

  const handleTermsAndConditions = () => {
    navigation.navigate("TermsAndConditions");
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

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
        <CustomInput
          value={username}
          setValue={(value) => setUsername(value)}
          placeholder="Username"
          secureTextEntry={false}
          width="90%"
          autoCapitalize="none"
          icon={<UserIcon size={20} color={colors.textInputDark} />}
        />
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="Email"
          secureTextEntry={false}
          width="90%"
          icon={<EnvelopeIcon size={20} color={colors.textInputDark} />}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          width="90%"
          icon={<LockClosedIcon size={20} color={colors.textInputDark} />}
        />
        <CustomInput
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          placeholder="Re-Enter Password"
          secureTextEntry={true}
          width="90%"
          icon={<LockClosedIcon size={20} color={colors.textInputDark} />}
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <CustomButton
            onPress={handleCreateAccount}
            text="CREATE"
            isLoading={isLoading}
            width="50%"
            bgColor={colors.primary}
            icon={<ArrowLongRightIcon size={25} color={"white"} />}
          />
        </View>
      </View>
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
