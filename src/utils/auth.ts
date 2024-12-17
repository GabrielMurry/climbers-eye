import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const checkCredentials = async () => {
  // Checks expirations of tokens
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return false;
  }

  const { exp: accessExp } = jwtDecode(accessToken);
  const { exp: refreshExp } = jwtDecode(refreshToken);
  if (accessExp === undefined || refreshExp === undefined) return false;

  const currentTime = Date.now() / 1000; // Current time in seconds since epoch

  // If both tokens have expired, return false
  if (accessExp < currentTime && refreshExp < currentTime) {
    return false;
  }

  return false;
};
