import { request } from "./common/apiRequest";

export const getTempCsrfToken = async () => {
  return await request("get", "auth/temp_csrf_token/");
};

export const loginUser = async (data) => {
  return await request("post", "auth/login/", data);
};

export const logoutUser = async (data) => {
  return await request("post", "auth/logout/", data);
};

export const signupUser = async (data) => {
  return await request("post", "auth/signup/", data);
};
