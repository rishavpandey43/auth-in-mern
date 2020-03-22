import * as ActionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errMessage: null
};

const cookieAuthDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST2:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.credentials
      };
    case ActionTypes.LOGIN_SUCCESS2:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMessage: ""
      };
    case ActionTypes.LOGIN_FAILURE2:
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
