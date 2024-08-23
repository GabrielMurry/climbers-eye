import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL, REFERER } from "@env";

console.log(BASE_URL);

const axiosRefreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    post: {
      "Content-Type": "application/json",
    },
  },
});

async function refreshTokenService() {
  const method = "post";
  const endpoint = "update_token/";

  const csrfToken = await AsyncStorage.getItem("csrfToken");
  const currentAccessToken = await AsyncStorage.getItem("accessToken");
  const currentRefreshToken = await AsyncStorage.getItem("refreshToken");

  const data = { currentAccessToken, currentRefreshToken };

  axiosRefreshAPI.defaults.headers.common["X-CSRFToken"] = csrfToken;
  axiosRefreshAPI.defaults.headers.common["Referer"] = REFERER;

  // EXECUTE
  const response = await axiosRefreshAPI.post(`update_token/`, data);

  const { accessToken, refreshToken } = response.data;

  return { accessToken, refreshToken };
}

export default refreshTokenService;
