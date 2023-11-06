import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from "../api/requestMethods";

export const getTempCsrfToken = async () => {
  const response = await request("get", "temp_csrf_token/");
  if (response.status !== 200) {
    console.log(response.status);
    return;
  }
};

export const clearAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      // If there are keys, clear AsyncStorage
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully.");
      getTempCsrfToken();
    } else {
      console.log("AsyncStorage is already empty.");
      getTempCsrfToken();
    }
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
