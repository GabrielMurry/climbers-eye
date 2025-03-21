import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../redux/hooks";
import { setIsSignedIn } from "../redux/features/user/userSlice";

export const checkCredentials = async () => {
  const dispatch = useAppDispatch();
  // Checks expirations of tokens
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");

  if (!accessToken || !refreshToken) {
    return false;
  }

  const { exp: accessExp } = jwtDecode(accessToken);
  const { exp: refreshExp } = jwtDecode(refreshToken);
  if (accessExp === undefined || refreshExp === undefined) return false;

  const currentTime = Date.now() / 1000; // Current time in seconds since epoch

  // If both tokens have expired, return false
  if (accessExp < currentTime && refreshExp < currentTime) {
    dispatch(setIsSignedIn(false));
  } else {
    console.log("HAS CREDENTIALS");
    dispatch(setIsSignedIn(true));
  }
};
