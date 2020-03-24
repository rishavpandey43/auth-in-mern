import { combineReducers } from "redux";

import basicAuthDetail from "./basicAuthDetail";
import sessionAuthDetail from "./sessionAuthDetail";
import tokenAuthDetail from "./tokenAuthDetail";
import userDetail from "./userDetail";

const rootReducer = combineReducers({
  basicAuthDetail,
  sessionAuthDetail,
  tokenAuthDetail,
  userDetail
});

export default rootReducer;
