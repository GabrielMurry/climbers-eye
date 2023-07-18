import axios from "./axios";

// Necessary axios config for POST, PUT, DELETE --> need csrf token from django
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get("/csrf_token/");
    const { csrfToken } = response.data;
    return csrfToken;
  } catch (error) {
    console.log("Failed to fetch CSRF token:", error);
    return null;
  }
};

export default fetchCsrfToken;
