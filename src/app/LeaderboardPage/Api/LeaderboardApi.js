import { preLoginWithKeyAxios } from "../../../utils";
import { GET_LEADERBOARD_DATA } from "./LeaderboardActionTypes";

export const getLeaderboardData = (ctx, stopLoading) => {
  return async function (dispatch, getState) {
    preLoginWithKeyAxios
      .post("strategy/backtest/get-strategy-leaderboard")
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            dispatch({
              type: GET_LEADERBOARD_DATA,
              payload: res.data.data,
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
      })
      .catch((err) => {
        if (stopLoading) {
          stopLoading();
        }
      });
  };
};
