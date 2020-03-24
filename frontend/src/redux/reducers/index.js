import { combineReducers } from "redux";

import basicAuthDetail from "./basicAuthDetail";
import sessionAuthDetail from "./sessionAuthDetail";
import tokenAuthDetail from "./tokenAuthDetail";
import loginType from "./LoginType";

const rootReducer = combineReducers({
  basicAuthDetail,
  sessionAuthDetail,
  tokenAuthDetail,
  loginType
});

export default rootReducer;
