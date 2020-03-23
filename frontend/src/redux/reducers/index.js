import { combineReducers } from "redux";

import basicAuthDetail from "./basicAuthDetail";
import cookieAuthDetail from "./cookieAuthDetail";
import sessionAuthDetail from "./sessionAuthDetail";
import tokenAuthDetail from "./tokenAuthDetail";
// import loginType from "./LoginType";

const rootReducer = combineReducers({
  basicAuthDetail,
  cookieAuthDetail,
  sessionAuthDetail,
  tokenAuthDetail
  // loginType
});

export default rootReducer;
