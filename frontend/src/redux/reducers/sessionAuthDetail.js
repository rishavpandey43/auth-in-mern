import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errMessage: null
};

const sessionAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.LOGIN_REQUEST_COOKIE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isAuthenticated: false,
    //     user: action.credentials
    //   };
    // case ActionTypes.LOGIN_SUCCESS_COOKIE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isAuthenticated: true,
    //     errMessage: ""
    //   };
    // case ActionTypes.LOGIN_FAILURE_COOKIE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isAuthenticated: false,
    //     errMessage: action.message
    //   };
    default:
      return state;
  }
};

export default sessionAuthDetail;
