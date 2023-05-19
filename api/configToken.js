import axios from "./axios";

// Necessary axios config for POST, PUT, DELETE --> need csrf token from django
const configToken = axios
  .get("/csrf-token/")
  .then((response) => {
    return {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": response.data.csrfToken, // Include the CSRF token in the request headers
      },
    };
  })
  .catch((err) => {
    console.log(err);
  });

export default configToken;
