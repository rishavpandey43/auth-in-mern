import * as ActionTypes from "../actions/actionTypes";

const initialState = null;

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_DETAIL:
      return {
        ...state,
        username: action.user.username,
        email: action.user.email,
        firstName: action.user.firstName,
        lastName: action.user.lastName
      };
    default:
      return state;
  }
};

export default userDetail;
