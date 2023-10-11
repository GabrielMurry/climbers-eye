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
import {
  setUser,
  setGym,
  setSpraywalls,
  setHeadshotImage,
} from "../redux/actions";
import SVGImg from "../assets/ClimbersEyeLogoShapes.svg";
import { colors } from "../utils/styles";
import {
  ArrowLongRightIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const data = { username, password };
    const response = await request("post", "login/", data);
    if (response.status !== 200) {
      console.log(response.status);
      setHasError(true);
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

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [username, password]);

  const ForgotPasswordButton = () => (
    <TouchableOpacity onPress={handleForgotPassword}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: colors.primary,
        }}
      >
        FORGOT
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>Login</Text>
        <SVGImg width={"100%"} height={50} />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          gap: 25,
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
          // bgColor={colors.textInputBG}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          width="90%"
          icon={<LockClosedIcon size={20} color={colors.textInputDark} />}
          button={<ForgotPasswordButton />}
          // bgColor={colors.textInputBG}
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <CustomButton
            onPress={handleLogin}
            text="LOGIN"
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
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* <CustomButton
          onPress={handleCreateAccount}
          text="Don't have an account? Create one"
          type="TERTIARY"
          width="90%"
        /> */}
        <View
          style={{
            height: 50,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Create one
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
});

export default LoginScreen;
