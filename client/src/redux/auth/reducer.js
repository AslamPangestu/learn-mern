import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from "./types";

type State = {
  token: String,
  isAuthenticated: String,
  isLoading: Boolean,
  user: Object
};

const initialState: State = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      localStorage.setItem("token",action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    }
    case USER_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    default: {
      return state;
    }
  }
};
