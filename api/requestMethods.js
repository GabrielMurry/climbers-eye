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
      return { status: response.status, data: response.data.data ?? null };
    } else {
      return { status: "CSRF token not found", data: null };
    }
  } catch (error) {
    return { status: `${method} error at ${endpoint}: ${error}`, data: null };
  }
};

export { request };
