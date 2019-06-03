import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import Api from "../../api/";

const getItems = () => async dispatch => {
  dispatch(setLoadingItems(true));
  var items = await Api.create().getItems();
  dispatch(setLoadingItems(false));
  dispatch(setItems(items.data));
};

const setItems = data => ({
  type: GET_ITEMS,
  payload: data
});

const addItems = data => {
  return {
    type: ADD_ITEMS,
    payload: data
  };
};

const deleteItems = id => {
  return {
    type: DELETE_ITEMS,
    payload: id
  };
};

const setLoadingItems = status => {
  return {
    payload: status,
    type: ITEMS_LOADING
  };
};

export default {
  getItems,
  addItems,
  deleteItems,
  setLoadingItems
};
