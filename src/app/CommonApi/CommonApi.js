import PostLoginNoModulusAxios from "src/utils/PostLoginNoModulusAxios";
import { GET_MODULUS_USER_WALLET_BALANCE } from "./CommonApiActionTypes";

export const updateModulusUserWallet = (passedData, connectWalletSuccess) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.post("users-api/users/wallets/update", passedData)
      .then((res) => {
        if (res.data.success) {
          if (connectWalletSuccess) {
            connectWalletSuccess();
          }
          if (res.data.data) {
            // dispatch({
            //   type: GET_REFERRAL_CODES_MODULUS,
            //   payload: res.data.data,
            // });
          }
        }
      })
      .catch((err) => {
        // ctx.setState({
        //   performanceMetricTableLoading: false,
        // });
      });
  };
};
export const getModulusUserWalletBalance = (passedData, ctx) => {
  return async function (dispatch, getState) {
    PostLoginNoModulusAxios.get("users-api/users/wallets/balance", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            dispatch({
              type: GET_MODULUS_USER_WALLET_BALANCE,
              payload: res.data.data,
            });
          }
        }
      })
      .catch((err) => {
        console.log("user balance error", err);

        // ctx.setState({
        //   performanceMetricTableLoading: false,
        // });
      });
  };
};
