import axios from "axios";
import { BASE_URL } from "@env";

const url = "https://climberseye-django-54eb29e79683.herokuapp.com/";

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
