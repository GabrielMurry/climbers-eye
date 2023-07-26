import axios from "axios";
// import { BASE_URL } from "@env";

const url = "http://192.168.1.176:8000/";

export default axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    patch: {
      "Content-Type": "application/json",
    },
    post: {
      "Content-Type": "application/json",
    },
    put: {
      "Content-Type": "application/json",
    },
  },
});

// unnecessary?
export const axiosPrivate = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
