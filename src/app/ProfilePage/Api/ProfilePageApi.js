import PostLoginNoModulusAxios from "src/utils/PostLoginNoModulusAxios";
import { postLoginInstance } from "../../../utils";
import {
  GET_REFERRAL_CODES_MODULUS,
  GET_STRATEGIES_CREATED_TABLE_DATA,
  GET_TOTAL_USER_CREATED_STRATEGY_COUNT,
  GET_USER_PROFILE_DATA,
} from "./ProfilePageActionTypes";

export const getTotalUserCreatedStrategyCount = () => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-total-performance-count")
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            let total = 0;
            if (res.data.data) {
              total = res.data.data;
            }
            dispatch({
              type: GET_TOTAL_USER_CREATED_STRATEGY_COUNT,
              payload: total,
            });
          }
        }
      })
      .catch((err) => {});
  };
};
export const getUserCreatedStrategies = (data, stopLoading) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-user-backtest-profile?page=" + data, data)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            if (res?.data?.data?.strategies) {
              const tempArrHolder = res.data.data.strategies;

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
export const getUserReferralCodes = (passedData, ctx) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.get("users-api/users/referral-codes", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            dispatch({
              type: GET_REFERRAL_CODES_MODULUS,
              payload: res.data.data,
            });
          }
        }
      })
      .catch((err) => {
        ctx.setState({
          performanceMetricTableLoading: false,
        });
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
export const editUserNameProfile = (passedData) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.post("users-api/users/username/update", passedData)
      .then((res) => {
        if (!res.data.error) {
          console.log("res.data?.data ", res.data.data);
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
