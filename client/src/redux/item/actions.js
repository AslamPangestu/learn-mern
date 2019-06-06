import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import Api from "../../api/";

const getItems = () => async dispatch => {
  dispatch(setLoadingItems());
  var items = await Api.create().getItems();
  dispatch({
    type: GET_ITEMS,
    payload: items.data
  });
};

const addItems = data => async dispatch => {
  dispatch(setLoadingItems());
  var items = await Api.create().postItems(data);
  if (items.data !== undefined) {
    dispatch({
      type: ADD_ITEMS,
      payload: items.data.data
    });
  }
};

const deleteItems = id => async dispatch => {
  dispatch(setLoadingItems());
  await Api.create().deleteItems(id);
  dispatch({
    type: DELETE_ITEMS,
    payload: id
  });
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
