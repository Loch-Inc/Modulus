import { postLoginInstance } from "../../../utils";
import {
  GET_BACK_TEST_CHART_DATA,
  GET_BACK_TEST_QUERIES,
  GET_BACK_TEST_TABLE_DATA,
  GET_LATEST_STRATEGY_ID,
} from "./BackTestActionTypes";

// https://testing.loch.one/api/common/backtest/get-queries
export const getBackTestQueries = (passedData, setStrategy) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-strategies", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            if (setStrategy === true) {
              dispatch({
                type: GET_BACK_TEST_QUERIES,
                payload: res.data.data.strategy_list,
              });
              // setStrategy(res.data.data.strategy_list);
            }
          }
        }
      })
      .catch((err) => {});
  };
};
export const getBackTestChart = (passedData, afterChartApi) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-chart-data", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            let tempResponse = [];
            let tempObj = res.data.data.chart_data;
            let teoOriginalObj = [];
            for (let key in tempObj) {
              if (tempObj.hasOwnProperty(key)) {
                const tempArrHolder = [];
                let tempArrHolderOriginal = {};
                for (let keyTwo in tempObj[key]) {
                  const tempArrHolderInside = [keyTwo, tempObj[key][keyTwo]];

                  const dateObj = new Date(keyTwo);
                  const timestamp = dateObj.getTime();
                  tempArrHolderOriginal = {
                    ...tempArrHolderOriginal,
                    [timestamp]: tempObj[key][keyTwo],
                  };

                  tempArrHolder.push(tempArrHolderInside);
                }

                let newObj = {
                  [key]: tempArrHolder,
                };
                tempResponse.push(newObj);
                teoOriginalObj.push(tempArrHolderOriginal);
              }
            }

            if (
              res.data.data.condition_results &&
              res.data.data.condition_results.length > 0
            ) {
              tempResponse.push({
                strategy: res.data.data.condition_results,
              });
            }

            dispatch({
              type: GET_BACK_TEST_CHART_DATA,
              // payload: res.data.data.chart_data,
              payload: {
                chartDataOriginal: teoOriginalObj,
                chartData: tempResponse,
              },
            });
          }
          if (afterChartApi) {
            afterChartApi(true);
          }
        } else {
          if (afterChartApi) {
            afterChartApi(false);
          }
        }
      })
      .catch((err) => {
        if (afterChartApi) {
          afterChartApi(false);
        }
      });
  };
};
export const getBackTestTable = (passedData, afterTableApi) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/get-performance-data", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.data) {
            const tempArrHolder = [];
            let tempObjHolder = res.data.data.performance_data;

            for (let key in tempObjHolder) {
              if (tempObjHolder.hasOwnProperty(key)) {
                const tempArrHolderInside = JSON.parse(
                  JSON.stringify(tempObjHolder[key])
                );
                let newObj = {
                  [key]: tempArrHolderInside,
                };
                tempArrHolder.push(newObj);
              }
            }

            dispatch({
              type: GET_BACK_TEST_TABLE_DATA,
              payload: tempArrHolder,
            });
          }
          if (afterTableApi) {
            afterTableApi(true);
          }
        } else {
          if (afterTableApi) {
            afterTableApi(false);
          }
        }
      })
      .catch((err) => {
        if (afterTableApi) {
          afterTableApi(false);
        }
      });
  };
};

export const createBackTestQuery = (passedData, ctx, afterQueryCreation) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/create-strategy", passedData)
      .then((res) => {
        if (!res.data.error) {
          let tempStrategyId = "";
          if (res?.data?.data?.strategy?.id) {
            tempStrategyId = res.data.data.strategy.id;
            dispatch({
              type: GET_LATEST_STRATEGY_ID,
              payload: res.data.data.strategy.id,
            });
          }
          if (afterQueryCreation) {
            afterQueryCreation(true, tempStrategyId);
          }
        } else {
          if (afterQueryCreation) {
            afterQueryCreation(false, "");
          }
        }
      })
      .catch((err) => {
        if (afterQueryCreation) {
          afterQueryCreation(false, "");
        }
      });
  };
};
export const updateBackTestQuery = (
  passedData,
  afterStrategyUpdate,
  passedStrategyId
) => {
  return async function (dispatch, getState) {
    postLoginInstance
      .post("strategy/backtest/update-strategy", passedData)
      .then((res) => {
        if (!res.data.error) {
          if (afterStrategyUpdate) {
            afterStrategyUpdate(true);
          }
        } else {
          if (afterStrategyUpdate) {
            afterStrategyUpdate(false);
          }
        }
      })
      .catch((err) => {
        if (afterStrategyUpdate) {
          afterStrategyUpdate(false);
        }
      });
  };
};
