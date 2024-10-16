import {
  GET_STRATEGIES_CREATED_TABLE_DATA,
  GET_REFERRAL_CODES_MODULUS,
  GET_TOTAL_USER_CREATED_STRATEGY_COUNT,
  GET_USER_PROFILE_DATA,
  GET_MODULUS_USER_WALLET_BALANCE,
} from "./CommonApiActionTypes";

const INITIAL_STATE = {};

export const ModulusUserWalletBalanceReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_MODULUS_USER_WALLET_BALANCE:
      return action.payload;
    default:
      return state;
  }
};
export const GetUserProfileDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_DATA:
      return action.payload;
    default:
      return state;
  }
};
export const TotalUserCreatedStrategyCountReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_TOTAL_USER_CREATED_STRATEGY_COUNT:
      return action.payload;
    default:
      return state;
  }
};
export const StrategiesCreatedTableReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case GET_STRATEGIES_CREATED_TABLE_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const ReferralCodesModulusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REFERRAL_CODES_MODULUS:
      return action.payload;
    default:
      return state;
  }
};
