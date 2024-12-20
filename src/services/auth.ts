import { request } from "./common/apiRequest";

type LoginData = {
  username: string;
  password: string;
};

type LogoutData = {
  refresh: string | null;
};

type SignupData = {
  username: string;
  email: string;
  password: string;
};

export const getTempCsrfToken = async () => {
  return await request("get", "auth/temp_csrf_token/");
};

export const loginUser = async (data: LoginData) => {
  return await request("post", "auth/login/", data);
};

export const logoutUser = async (data: LogoutData) => {
  return await request("post", "auth/logout/", data);
};

export const signupUser = async (data: SignupData) => {
  return await request("post", "auth/signup/", data);
};
