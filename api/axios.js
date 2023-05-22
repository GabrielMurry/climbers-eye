import axios from "axios";
const BASE_URL = "http://192.168.50.29:8000/";
// For development on web, localhost works
// However for react native expo development (on ios emulator), localhost does not work
// Could be ios blocking localhost or non-https
// Since backend server is running on localhost and on my machine, find the ip for my machine
// Since I use mac, I can run 'ipconfig getifaddr en0' in terminal to get ip address of my mac
// Replace localhost with ip address
// https://stackoverflow.com/questions/60639983/react-native-expo-fetch-throws-network-request-failed

export default axios.create({
  baseURL: BASE_URL,
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
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
