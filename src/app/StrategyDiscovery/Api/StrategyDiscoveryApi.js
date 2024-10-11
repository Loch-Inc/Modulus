import { postLoginInstance } from "../../../utils";
import { GET_STRATEGY_DISCOVERY_TABLE_DATA } from "./StrategyDiscoveryActionTypes";

export const getDiscoverStrategyApi = (passedData, stopLoading) => {
  return async function (dispatch, getState) {
    postLoginInstance

      .post("strategy/backtest/discover-strategies", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            dispatch({
              type: GET_STRATEGY_DISCOVERY_TABLE_DATA,
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
