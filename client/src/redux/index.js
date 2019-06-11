import { combineReducers } from "redux";
import item from "./item";
import auth from "./auth";
import error from "./error";

export default combineReducers({
  auth: auth.reducer,
  item: item.reducer,
  error: error.reducer
});
