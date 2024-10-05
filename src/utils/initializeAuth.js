import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTempCsrfToken } from "../services/auth";

export const clearAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      // If there are keys, clear AsyncStorage
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully.");
      await getTempCsrfToken();
    } else {
      console.log("AsyncStorage is already empty.");
      await getTempCsrfToken();
    }
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
