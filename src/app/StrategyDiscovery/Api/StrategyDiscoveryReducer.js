import {
  GET_STRATEGY_DISCOVERY_TABLE_DATA,
  GET_STRATEGY_DISCOVERY_TABLE_DATA_COUNT,
} from "./StrategyDiscoveryActionTypes";

const INITIAL_STATE = {};

export const StrategyDiscoveryTableReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_STRATEGY_DISCOVERY_TABLE_DATA:
      return action.payload;
    default:
      return state;
  }
};
export const StrategyDiscoveryTableCountReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_STRATEGY_DISCOVERY_TABLE_DATA_COUNT:
      return action.payload;
    default:
      return state;
  }
};
