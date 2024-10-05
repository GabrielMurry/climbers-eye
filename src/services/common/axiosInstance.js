import axios from "axios";
import { BASE_URL } from "@env";
import tokenRefreshService from "./tokenRefreshService";
import AsyncStorage from "@react-native-async-storage/async-storage";
console.log(BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR - for expired access token
// Setting up the interceptor in the same file ensures it's applied to every instance of axiosInstance imported
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for expiration condition (401 status code)
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log(
        "401 error! Access token expired. Retrieving new access token..."
      );
      originalRequest._retry = true; // mark the request that is a retry
      try {
        const { accessToken, refreshToken } = await tokenRefreshService(); // This service handles the token refresh logic
        console.log(accessToken);
        console.log(refreshToken);
        if (accessToken && refreshToken) {
          // Store tokens in AsyncStorage (access token is new. Refresh token stays the same as previous)
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);

          // Update the token on the original request and resend it
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Unable to refresh access token", refreshError);
        // Redirect to login
      }
    }
    // Return error if retry fails
    return Promise.reject(error);
  }
);

export default axiosInstance;
