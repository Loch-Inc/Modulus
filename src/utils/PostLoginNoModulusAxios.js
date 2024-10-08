import axios from "axios";
import { API_BASE_URL_LOGGED_OUT } from "./Constant";
import { getToken } from "./ManageToken";

const PostLoginNoModulusAxios = axios.create({
  // baseURL: 'http://13.232.184.100/hbits/dev',  // Url for Dev
  // baseURL: 'http://15.206.55.156/api/', // Url for UAT
  baseURL: API_BASE_URL_LOGGED_OUT, // Url for UAT
  // baseURL: 'http://127.0.0.1:5000/api', // Url for Local
  // baseURL: 'http://3.7.185.1/api/',  // Url for Production
  headers: {
    "Content-Type": "application/json",
  },
});
// SET THE AUTH TOKEN FOR ANY REQUEST
PostLoginNoModulusAxios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + getToken();
  return config;
});
// INTERCEPT RESPONSE TO CHECK IF TOKEN HAS EXPIRED AND IF YES THEN REDIRECT TO LOGIN OR HOME
PostLoginNoModulusAxios.interceptors.response.use(undefined, (error) => {
  console.log("error", error);
  // if (error?.response?.status === 401) {
  //   deleteToken();
  //   window.location = "/";
  // }
  return Promise.reject(error);
});

export default PostLoginNoModulusAxios;
