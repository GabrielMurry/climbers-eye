import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { clearAsyncStorage } from "../../utils/initializeAuth";
import { useSelector } from "react-redux";

// Checking for access and refresh token validity and expiration on app start up.

const AuthLoadingScreen = ({ navigation }) => {
  const { gym } = useSelector((state) => state.gymReducer);
  const checkTokenExpiry = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      return false;
    }

    const { exp: accessExp } = jwtDecode(accessToken);
    const { exp: refreshExp } = jwtDecode(refreshToken);

    const currentTime = Date.now() / 1000; // Current time in seconds since epoch

    // If both tokens have expired, return false
    if (accessExp < currentTime && refreshExp < currentTime) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const isTokenValid = await checkTokenExpiry();
      if (!isTokenValid) {
        // Navigate to Login Screen
        clearAsyncStorage();
        navigation.navigate("Login");
      } else {
        // Navigate to Home Screen
        if (gym) {
          navigation.navigate("Tabs");
        } else {
          navigation.navigate("Tabs", { screen: "Map" });
        }
      }
    };
    initializeAuth();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default AuthLoadingScreen;
