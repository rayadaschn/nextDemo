import * as types from "./action-types";

const initialState = {
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
