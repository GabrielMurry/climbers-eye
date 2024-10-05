import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL, REFERER } from "@env";
console.log(BASE_URL);

const axiosTokenInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    post: {
      "Content-Type": "application/json",
    },
  },
});

async function tokenRefreshService() {
  const csrfToken = await AsyncStorage.getItem("csrfToken");
  const currentAccessToken = await AsyncStorage.getItem("accessToken");
  const currentRefreshToken = await AsyncStorage.getItem("refreshToken");

  const data = { currentAccessToken, currentRefreshToken };

  axiosTokenInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
  axiosTokenInstance.defaults.headers.common["Referer"] = REFERER;

  // EXECUTE
  const response = await axiosTokenInstance.post(`auth/update_token/`, data);

  const { accessToken, refreshToken } = response.data;

  return { accessToken, refreshToken };
}

export default tokenRefreshService;
