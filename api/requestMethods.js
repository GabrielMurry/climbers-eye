import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// "data" parameter is optional
const request = async (method, endpoint, data = null) => {
  try {
    // grab csrf token from storage
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    console.log(method, endpoint);
    console.log("------");
    console.log(csrfToken);
    console.log("------");
    // attach csrf token to request header
    axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    // request method to backend endpoint with or without data
    const response = await axios[method](`/${endpoint}`, data);
    // receive new csrf token - put in storage
    if (response.data.csrfToken) {
      console.log("++++++");
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
      console.log(response.data.csrfToken);
      console.log("++++++");
    }
    // return status and data. If no data, null as data
    return { status: response.status, data: response.data.data ?? null };
  } catch (error) {
    return { status: `${method} error at ${endpoint}: ${error}`, data: null };
  }
};

export { request };
