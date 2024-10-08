import { postLoginInstance } from "../../../utils";
import {
  GET_STRATEGY_DISCOVERY_TABLE_DATA,
  GET_STRATEGY_DISCOVERY_TABLE_DATA_COUNT,
} from "./StrategyDiscoveryActionTypes";

export const getDiscoverStrategyCountApi = (ctx) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-strategy-count")
      .then((res) => {
        if (!res.data.error) {
          if (!res.data.error) {
            if (res.data.data) {
              let total = 0;
              if (res.data.data) {
                total = res.data.data;
              }
              dispatch({
                type: GET_STRATEGY_DISCOVERY_TABLE_DATA_COUNT,
                payload: total,
              });
            }
          }
        }
      })
      .catch((err) => {});
  };
};

export const getDiscoverStrategyApi = (passedData, stopLoading) => {
  return async function (dispatch, getState) {
    postLoginInstance

      .post("strategy/backtest/discover-strategies", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            const tempArrHolder = [...res.data.data.strategies];

            dispatch({
              type: GET_STRATEGY_DISCOVERY_TABLE_DATA,
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
      })
      .catch((err) => {
        if (stopLoading) {
          stopLoading();
        }
      });
  };
};
