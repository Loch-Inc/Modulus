import { toast } from "react-toastify";
import { preLoginInstance } from "../../../utils";

export const signInApi = (passedData, successCallback, errorCallback) => {
  return async function (dispatch, getState) {
    preLoginInstance
      .post("users-api/auth", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.success) {
            if (successCallback) {
              successCallback(res.data.data);
            }
          }
        }
      })
      .catch((err) => {
        if (errorCallback) {
          errorCallback();
        }
        if (err?.response?.data?.message) {
          let message = err.response.data.message;
          if (message.endsWith(".")) {
            message = message.slice(0, -1);
          }
          toast.error(message);
        }
      });
  };
};
export const signUpApi = (passedData, successCallback, errorCallback) => {
  return async function (dispatch, getState) {
    preLoginInstance
      .post("users-api/auth/register", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.success) {
            if (successCallback) {
              successCallback(res.data.data);
            }
          }
        }
      })
      .catch((err) => {
        if (errorCallback) {
          errorCallback();
        }
        if (err?.response?.data?.message) {
          let message = err.response.data.message;
          if (message.endsWith(".")) {
            message = message.slice(0, -1);
          }
          toast.error(message);
        }
      });
  };
};
