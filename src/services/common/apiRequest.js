import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFERER } from "@env";

// "data" parameter is optional
const request = async (method, endpoint, data = null) => {
  try {
    console.log(method, endpoint);
    // grab csrf token, access token, and refresh token from storage
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("csrf:", csrfToken);
    console.log("access:", accessToken);

    // attach csrf token to request header
    // Including the actual CSRF token in GET requests is generally not a common practice and is not required for CSRF protection.
    // The primary purpose of CSRF tokens is to protect against unauthorized state-changing requests, which are typically made using POST, PUT, DELETE, or similar HTTP methods.
    if (method == "post" || method == "put" || method == "delete") {
      axiosInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
      axiosInstance.defaults.headers.common["Referer"] = REFERER;
    }
    if (accessToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }

    // EXECUTE request method to backend endpoint with or without data
    const response = await axiosInstance[method](`/${endpoint}`, data);

    // Update CSRF token if new one received - put in storage
    if (response.data.csrfToken) {
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
    }
    if (response.data.accessToken && response.data.refreshToken) {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    }

    // return response object containing our status and data (data may be null)
    return response;
  } catch (error) {
    console.error(`${method} error at ${endpoint}: ${error}`);

    return null;
  }
};

export { request };
