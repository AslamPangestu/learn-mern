import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import Api from "../../api/";
import AuthRedux from "../auth";
import ErrorRedux from "../error";

const getItems = () => async dispatch => {
  dispatch(setLoadingItems());
  var items = await Api.create().getItems();
  if (items.data) {
    dispatch({
      type: GET_ITEMS,
      payload: items.data
    });
  } else {
    dispatch(ErrorRedux.actions.returnError(items.message, items.status));
  }
};

const addItems = data => async (dispatch, getState) => {
  dispatch(setLoadingItems());
  var config = AuthRedux.actions.headerConfig(getState);
  var items = await Api.create().postItems({ data, config });
  if (items.data !== undefined) {
    dispatch({
      type: ADD_ITEMS,
      payload: items.data.data
    });
  } else {
    dispatch(ErrorRedux.actions.returnError(items.message, items.status));
  }
};

const deleteItems = id => async (dispatch, getState) => {
  dispatch(setLoadingItems());
  var config = AuthRedux.actions.headerConfig(getState);
  var deleted = await Api.create().deleteItems({ id, config });
  if (deleted) {
    dispatch({
      type: DELETE_ITEMS,
      payload: id
    });
  } else {
    dispatch(ErrorRedux.actions.returnError(deleted.message, deleted.status));
  }
};

const setLoadingItems = () => ({
  type: ITEMS_LOADING
});

export default {
  getItems,
  addItems,
  deleteItems,
  setLoadingItems
};
