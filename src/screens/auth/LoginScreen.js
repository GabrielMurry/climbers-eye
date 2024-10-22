import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../../components/custom/CustomInput";
import CustomButton from "../../components/custom/CustomButton";
import { useDispatch } from "react-redux";
import { colors } from "../../utils/styles";
import {
  ArrowLongRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { loginUser } from "../../services/auth";
import { setUser } from "../../redux/features/user/userSlice";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const data = { username, password };
    const response = await loginUser(data);
    if (response.status !== 200) {
      console.log(response.status);
      setHasError(true);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      const user = response.data.user;
      const userInfo = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        profilePicUrl: user.profilePicUrl,
        profilePicWidth: user.profilePicWidth,
        profilePicHeight: user.profilePicHeight,
        logbookCount: user.logbookCount,
        likesCount: user.likesCount,
        bookmarksCount: user.bookmarksCount,
        creationsCount: user.creationsCount,
      };
      dispatch(setUser(userInfo));
      if (user.gym) {
        dispatch(setGym(user.gym));
        dispatch(setSpraywalls(user.spraywalls));
        navigation.navigate("Tabs", { screen: "Home" });
      } else {
        navigation.navigate("Tabs", { screen: "Map" });
      }
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    navigation.navigate("AuthStack", { screen: "ForgotPassword" });
  };

  const handleCreateAccount = () => {
    navigation.navigate("AuthStack", { screen: "Signup" });
  };

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [username, password]);

  const ShowPasswordButton = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? (
        <EyeSlashIcon size={25} color={colors.textInputDark} />
      ) : (
        <EyeIcon size={25} color={colors.textInputDark} />
      )}
    </TouchableOpacity>
  );

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
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>Login</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>
          Please sign in to continue.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 350,
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
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
          secureTextEntry={!showPassword}
          width="90%"
          icon={<LockClosedIcon size={20} color={colors.textInputDark} />}
          button={<ShowPasswordButton />}
          // bgColor={colors.textInputBG}
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "gray" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
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
