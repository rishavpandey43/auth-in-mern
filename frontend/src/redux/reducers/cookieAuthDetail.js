import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  userId: null,
  errMessage: null,
  successMessage: null,
  token: null
};

const cookieAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST_COOKIE:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      };
    case ActionTypes.LOGIN_SUCCESS_COOKIE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: "",
        successMessage: action.successMessage,
        token: action.token
      };
    case ActionTypes.LOGIN_FAILURE_COOKIE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.message
      };
    case ActionTypes.VALIDATE_COOKIE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.VALIDATE_COOKIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.userId
      };
    case ActionTypes.VALIDATE_COOKIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMessage: action.message
      };
    default:
      return state;
  }
};

export default cookieAuthDetail;
