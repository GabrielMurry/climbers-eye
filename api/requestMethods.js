import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// "data" parameter is optional
const request = async (method, endpoint, data = null) => {
  try {
    // grab csrf token from storage
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    console.log(method, endpoint);
    // attach csrf token to request header
    // Including the actual CSRF token in GET requests is generally not a common practice and is not required for CSRF protection.
    // The primary purpose of CSRF tokens is to protect against unauthorized state-changing requests, which are typically made using POST, PUT, DELETE, or similar HTTP methods.
    if (method == "post" || method == "put" || method == "delete") {
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      axios.defaults.headers.common["Referer"] =
        "https://climberseye-django-54eb29e79683.herokuapp.com";
    }
    // request method to backend endpoint with or without data
    const response = await axios[method](`/${endpoint}`, data);
    // receive new csrf token - put in storage
    if (response.data.csrfToken) {
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
    }
    // return response object containing our status and data (data may be null)
    return response;
  } catch (error) {
    return { status: `${method} error at ${endpoint}: ${error}`, data: null };
  }
};

export { request };
