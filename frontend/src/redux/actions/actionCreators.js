import axios from "axios";

import * as ActionTypes from "./actionTypes";

export const loginRequest = credentials => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    credentials
  };
};

export const loginSuccess = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginFailure = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    token: response.token
  };
};

export const login = credentials => dispatch => {
  dispatch(loginRequest(credentials));
  console.log(credentials);
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
