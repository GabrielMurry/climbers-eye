import axiosInstance from "./axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFERER } from "@env";
import { AxiosRequestConfig } from "axios";

const request = async (
  method: string,
  endpoint: string,
  data?: object | FormData
) => {
  try {
    console.log(method, endpoint);
    // grab csrf token, access token, and refresh token from storage
    const csrfToken = await AsyncStorage.getItem("csrfToken");
    const accessToken = await AsyncStorage.getItem("accessToken");

    // if (data instanceof FormData) {
    //   console.log("FORM DATA");
    //   axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
    // } else {
    //   axiosInstance.defaults.headers["Content-Type"] = "application/json";
    // }

    // attach csrf token to request header
    // Including the actual CSRF token in GET requests is generally not a common practice and is not required for CSRF protection.
    // The primary purpose of CSRF tokens is to protect against unauthorized state-changing requests, which are typically made using POST, PUT, DELETE, or similar HTTP methods.
    if (method == "post" || method == "put" || method == "delete") {
      axiosInstance.defaults.headers["X-CSRFToken"] = csrfToken;
      axiosInstance.defaults.headers["Referer"] = REFERER;
    }
    if (accessToken) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // EXECUTE request method to backend endpoint with or without data
    // const response = await axiosInstance({
    //   method: method,
    //   url: `/${endpoint}`,
    //   data: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     // if backend supports u can use gzip request encoding
    //     // "Content-Encoding": "gzip",
    //   },
    //   transformRequest: (data, headers) => {
    //     // !!! override data to return formData
    //     // since axios converts that to string
    //     return formData;
    //   },
    // });

    let config: AxiosRequestConfig = {};

    if (data instanceof FormData) {
      config = {
        method: method,
        url: `/${endpoint}`,
        headers: {
          "Content-Type": "multipart/form-data",

          // if backend supports u can use gzip request encoding
          // "Content-Encoding": "gzip",
        },
        transformRequest: (d) => d,
        data: data,
      };
    } else {
      config = {
        method: method,
        url: `/${endpoint}`,
        headers: {
          "Content-Type": "application/json",

          // if backend supports u can use gzip request encoding
          // "Content-Encoding": "gzip",
        },
        data: data,
      };
    }

    console.log("config:", config);

    console.log("test1");

    const response = await axiosInstance(config);
    console.log("test2");

    // const response = await axiosInstance[req.method](
    //   `/${req.endpoint}`,
    //   req?.data
    // );

    // Update CSRF token if new one received - put in storage
    if (response.data.csrfToken) {
      await AsyncStorage.setItem("csrfToken", response.data.csrfToken);
    }
    if (response.data.accessToken && response.data.refreshToken) {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    }

    // return response object containing our status and data (data may be null)
    return response;
  } catch (error) {
    console.error(`${method} error at ${endpoint}: ${error}`);
    throw error;
  }
};

export { request };
