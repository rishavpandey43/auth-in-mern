import axios from "axios";

import * as ActionTypes from "./actionTypes";

/* Below Actions are only for basic authentication, where browser doesn't remember any data. You need to send username, password for every request */

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const loginRequestBasic = response => {
  return {
    type: ActionTypes.LOGIN_REQUEST_BASIC,
    userCredentials: response
  };
};

export const loginSuccessBasic = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_BASIC,
    successMessage: response.message
  };
};

export const loginFailureBasic = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_BASIC,
    errMessage: response
  };
};

export const loginFetchBasic = credentials => dispatch => {
  // dispatch the action
  dispatch(loginRequestBasic(credentials));

  // establish connection with server
  axios
    .post(baseUrl + "api/v1/users/login", JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      dispatch(loginSuccessBasic(res.data));
      dispatch(setUserDetail(res.data.user));
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureBasic(err.response.data.message))
        : dispatch(
            loginFailureBasic(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

export const logoutSuccessBasic = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_BASIC
  };
};

export const logoutFetchBasic = () => dispatch => {
  dispatch(logoutSuccessBasic());
  dispatch(removeUserDetail());
};

/* Below Actions are only for token based authentication, where browser will remember necessary data in the form of cookie or local storage. */

export const loginRequestToken = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST_TOKEN
  };
};

export const loginSuccessToken = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_TOKEN,
    successMessage: response.message
  };
};

export const loginFailureToken = response => {
  return {
    type: ActionTypes.LOGIN_FAILURE_TOKEN,
    errMessage: response
  };
};

export const validateTokenRequest = () => {
  return {
    type: ActionTypes.VALIDATE_TOKEN_REQUEST
  };
};

export const validateTokenSuccess = response => {
  return {
    type: ActionTypes.VALIDATE_TOKEN_SUCCESS,
    userId: response.userId
  };
};

export const validateTokenFailure = response => {
  return {
    type: ActionTypes.VALIDATE_TOKEN_FAILURE,
    errMessage: response
  };
};

export const loginFetchToken = ({
  credentials,
  tokenStorageType
}) => dispatch => {
  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
    storageType: tokenStorageType
  };
  // dispatch the action
  // dispatch(setLoginType("COOKIE"));
  dispatch(loginRequestToken());

  // establish connection with server
  axios
    .post(baseUrl + "api/v2/users/login", JSON.stringify(newCredentials), {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      dispatch(loginSuccessToken(res.data));
      localStorage.setItem("auth_practice_token", res.data.token);
    })
    .catch(err => {
      err.response
        ? dispatch(loginFailureToken(err.response.data.message))
        : dispatch(
            loginFailureToken(
              "Network Error, Connection to server couldn't be established. Please try again."
            )
          );
    });
};

// export const validateTokenFetch = token => dispatch => {
//   dispatch(validateTokenRequest());

//   axios
//     .get(baseUrl + "api/v2/users/validate-cookie")
//     .then(res => {
//       console.log(res);
//       dispatch(validateTokenSuccess(res.data));
//     })
//     .catch(err => {
//       console.log(err.response);
//       dispatch(validateTokenFailure(err.response.data.message));
//     });
// };

export const logoutRequestToken = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST_TOKEN
  };
};

export const logoutSuccessToken = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_TOKEN
  };
};

export const logoutFailureToken = response => {
  return {
    type: ActionTypes.LOGOUT_FAILURE_TOKEN,
    errMessage: response
  };
};

export const logoutFetchToken = () => dispatch => {
  dispatch(logoutRequestToken());
  if (localStorage.getItem("auth_practice_token")) {
    console.log("Token found");
    localStorage.removeItem("auth_practice_token");
  }
  if (!localStorage.getItem("auth_practice_token")) {
    dispatch(logoutSuccessToken());
    dispatch(removeUserDetail());
    console.log("No token");
  }
};

export const setUserDetail = response => {
  return {
    type: ActionTypes.SET_USER_DETAIL,
    user: response
  };
};

export const removeUserDetail = response => {
  return {
    type: ActionTypes.REMOVE_USER_DETAIL
  };
};
