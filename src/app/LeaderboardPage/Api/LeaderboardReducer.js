import { GET_LEADERBOARD_DATA } from "./LeaderboardActionTypes";

const INITIAL_STATE = {};

export const LeaderboardDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LEADERBOARD_DATA:
      return action.payload;
    default:
      return state;
  }
};
