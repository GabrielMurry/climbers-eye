import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/custom/CustomButton";
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
import { useAppDispatch } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../components/custom/inputs/CustomInput";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
        navigation.navigate("TabsStack", {
          screen: "HomeStack",
          params: { screen: "HomeList" },
        });
      } else {
        navigation.navigate("TabsStack", {
          screen: "MapStack",
          params: { screen: "Map" },
        });
      }
    }
    setIsLoading(false);
  };

  // const handleForgotPassword = () => {
  //   navigation.navigate("AuthStack", { screen: "ForgotPassword" });
  // };

  // const handleCreateAccount = () => {
  //   navigation.navigate("AuthStack", { screen: "Signup" });
  // };

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
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
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
          height: 350,
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          paddingHorizontal: 20,
        }}
      >
        <CustomTextInput
          value={username}
          setValue={(value: string) => setUsername(value)}
          placeholder="Username"
          secureTextEntry={false}
          // icon={<UserIcon size={20} color={colors.textInputDark} />}
        />
        <CustomTextInput
          value={password}
          setValue={(value: string) => setPassword(value)}
          placeholder="Password"
          secureTextEntry={!showPassword}
          // icon={<LockClosedIcon size={20} color={colors.textInputDark} />}
          // button={<ShowPasswordButton />}
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
            // icon={<ArrowLongRightIcon size={25} color={"white"} />}
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
          {/* <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Create one
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
