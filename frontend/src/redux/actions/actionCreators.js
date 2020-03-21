import axios from "axios";

import * as ActionTypes from "./actionTypes";

export const loginRequest = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST
  };
};

export const loginSuccess = () => {
  return {
    type: ActionTypes.LOGIN_SUCCESS
  };
};

export const loginFailure = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    errMessage: response
  };
};

export const loginFetch = credentials => dispatch => {
  // dispatch the action
  dispatch(loginRequest());

  // establish connection with server
  axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "api/v1/users/login",
      JSON.stringify(credentials),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      dispatch(loginSuccess());
    })
    .catch(err => {
      dispatch(loginFailure(err.response.data.message));
    });
};

export const logoutRequest = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
};

export const logoutFailure = () => {
  return {
    type: ActionTypes.LOGOUT_FAILURE
  };
};
