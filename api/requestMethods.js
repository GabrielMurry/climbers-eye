import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// "data" parameter is optional
const request = async (method, endpoint, data = null) => {
  try {
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    if (csrfToken) {
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
      const response = await axios[method](`/${endpoint}/`, data);
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
      return response.status;
    } else {
      return "CSRF token not found";
    }
  } catch (error) {
    return `${method} error at ${endpoint}: ${error}`;
  }
};

export { request };
