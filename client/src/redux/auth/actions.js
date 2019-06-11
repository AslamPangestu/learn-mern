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
import Api from "../../api/";
import ErrorRedux from "../error";

//login
const login = ({ email, password }) => async dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  var login = await Api.create().loginUser({ body, config });
  if (login.token) {
    dispatch({ type: LOGIN_SUCCESS, payload: login });
  } else {
    dispatch(
      ErrorRedux.actions.returnError(login.message, login.status, "LOGIN_FAIL")
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

//register
const register = ({ name, email, password }) => async dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  var registered = await Api.create().registerUser({ body, config });
  console.log("Data", registered);
  if (registered.token) {
    dispatch({ type: REGISTER_SUCCESS, payload: registered });
  } else {
    dispatch(
      ErrorRedux.actions.returnError(
        registered.message,
        registered.status,
        "REGISTER_FAIL"
      )
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

const logout = () => ({
  type: LOGOUT_SUCCESS
});

//check token and load user
const loadUser = () => async (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });
  var config = headerConfig(getState);
  console.log("CONFIG", config);

  var data = await Api.create().getUser(config);
  if (!data.message) {
    dispatch({ type: USER_LOADED, payload: data });
  } else {
    dispatch(ErrorRedux.actions.returnError(data.message, data.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// config header and token
const headerConfig = getState => {
  //get token from local
  const token = getState().auth.token;
  console.log("TOKEN", token);
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //cek token
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export default {
  loadUser,
  headerConfig,
  register,
  logout,
  login
};
