import axios from "axios";
import { BASE_URL, REFERER } from "@env";
import * as SecureStore from "expo-secure-store";

console.log(BASE_URL);
console.log("--");

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

async function tokenRefreshService(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const csrfToken = await SecureStore.getItemAsync("csrfToken");
  const currentAccessToken = await SecureStore.getItemAsync("accessToken");
  const currentRefreshToken = await SecureStore.getItemAsync("refreshToken");

  const data = { currentAccessToken, currentRefreshToken };

  axiosTokenInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
  axiosTokenInstance.defaults.headers.common["Referer"] = REFERER;
  // EXECUTE
  const response = await axiosTokenInstance.post(`auth/update_token/`, data);

  const { accessToken, refreshToken } = response.data;

  return { accessToken, refreshToken };
}

export default tokenRefreshService;
