import PostLoginNoModulusAxios from "src/utils/PostLoginNoModulusAxios";
import { postLoginInstance } from "../../../utils";
import {
  GET_REFERRAL_CODES_MODULUS,
  GET_STRATEGIES_CREATED_TABLE_DATA,
  GET_USER_PROFILE_DATA,
} from "./ProfilePageActionTypes";

export const getUserCreatedStrategies = (data, stopLoading) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-user-backtest-profile?page=" + data, data)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            if (res?.data?.data?.strategies) {
              const tempArrHolder = res.data.data;

              dispatch({
                type: GET_STRATEGIES_CREATED_TABLE_DATA,
                payload: tempArrHolder,
              });
            } else {
              if (stopLoading) {
                stopLoading();
              }
            }
          } else {
            if (stopLoading) {
              stopLoading();
            }
          }
        }
      })
      .catch((err) => {
        if (stopLoading) {
          stopLoading();
        }
      });
  };
};
export const getUserReferralCodes = (passedData) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.get("users-api/users/referral-codes", passedData)
      .then((res) => {
        if (!res.data.error) {
          let userReferralCode = "";

          if (
            res?.data?.data?.referralCodes &&
            res?.data?.data?.referralCodes.length > 0
          ) {
            userReferralCode = res.data.data.referralCodes[0].code;
            sessionStorage.setItem("userReferralCode", userReferralCode);
          }

          if (res.data.data) {
            dispatch({
              type: GET_REFERRAL_CODES_MODULUS,
              payload: res.data.data,
            });
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
export const getUserProfileData = () => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.get("users-api/users/profile")
      .then((res) => {
        if (!res.data.error) {
          if (res.data?.data?.user) {
            dispatch({
              type: GET_USER_PROFILE_DATA,
              payload: res.data.data.user,
            });
          }
        }
      })
      .catch((err) => {});
  };
};
export const editUserNameProfile = (
  passedData,
  successCallback,
  errorCallback
) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.post("users-api/users/username/update", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.success) {
            if (successCallback) {
              successCallback();
            }
          } else {
            if (errorCallback) {
              errorCallback();
            }
          }
        } else {
          if (errorCallback) {
            errorCallback();
          }
        }
      })
      .catch((err) => {
        if (errorCallback) {
          errorCallback();
        }
      });
  };
};
