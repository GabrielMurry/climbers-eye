import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// "data" parameter is optional
const request = async (method, endpoint, data = null) => {
  try {
    // grab csrf token from storage
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    if (csrfToken) {
      // attach csrf token to request header
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      // request method to backend endpoint with or without data
      const response = await axios[method](`/${endpoint}`, data);
      // receive new csrf token - put in storage
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
      // if we are logging in or signing up, put unique username and user ID in storage
      if (response.data.username && response.data.userId) {
        await AsyncStorage.setItem("username", response.data.username);
        await AsyncStorage.setItem(
          "userId",
          JSON.stringify(response.data.userId)
        );
      }
      // return status and data. If no data, null as data
      return { status: response.status, data: response.data.data ?? null };
    } else {
      return { status: "CSRF token not found", data: null };
    }
  } catch (error) {
    return { status: `${method} error at ${endpoint}: ${error}`, data: null };
  }
};

export { request };
