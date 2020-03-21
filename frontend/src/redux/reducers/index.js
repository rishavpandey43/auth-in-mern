import { combineReducers } from "redux";

import basicAuthDetail from "./basicAuthDetail";
import cookieAuthDetail from "./cookieAuthDetail";
import sessionAuthDetail from "./sessionAuthDetail";
import tokenAuthDetail from "./tokenAuthDetail";

const rootReducer = combineReducers({
  basicAuthDetail,
  cookieAuthDetail,
  sessionAuthDetail,
  tokenAuthDetail
});

export default rootReducer;
