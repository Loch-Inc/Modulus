import axios from "axios";
import { API_BASE_URL } from "./Constant";

const preLoginWithKeyAxios = axios.create({
  baseURL: API_BASE_URL, // Url for UAT
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
// SET THE AUTH TOKEN FOR ANY REQUEST
preLoginWithKeyAxios.interceptors.request.use(function (config) {
  return config;
});
// INTERCEPT RESPONSE TO CHECK IF TOKEN HAS EXPIRED AND IF YES THEN REDIRECT TO LOGIN OR HOME
preLoginWithKeyAxios.interceptors.response.use(undefined, (error) => {
  console.log("error", error);
  return Promise.reject(error);
});

export default preLoginWithKeyAxios;
