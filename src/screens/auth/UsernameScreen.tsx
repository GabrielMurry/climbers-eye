import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";
import axios from "axios";
import { BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../../redux/hooks";
import { setIsSignedIn, setUser } from "../../redux/features/user/userSlice";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { Gym } from "../../utils/types/gym";

type UsernameScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Username"
>;

const UsernameScreen: React.FC<UsernameScreenProps> = ({ route }) => {
  const { email, password } = route.params;
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    axios
      .post(`${BASE_URL}/auth/signup/`, { email, password, username })
      .then(async (res) => {
        // Set tokens
        console.log(res.data);
        await SecureStore.setItemAsync("accessToken", res.data.accessToken);
        await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
        await SecureStore.setItemAsync("csrfToken", res.data.csrfToken);
        // Set user
        const user = res.data.user;
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
        dispatch(setIsSignedIn(true));
      })
      .catch((err) => {
        console.log("Login failed", err.message); // should say 'Network Error'
        console.log("Error config:", err.config);
        console.log("Error request:", err.request); // useful: might show failed URL
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Username</Text>
        </View>
        <View style={{ gap: 50 }}>
          <CommonTextInput
            value={username}
            setValue={setUsername}
            title="Username"
          />
          <CommonSubmitButton onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsernameScreen;
