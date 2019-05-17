import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from "./types";

const getItems = () => {
  return {
    type: GET_ITEMS
  };
};

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

export default {
  getItems,
  addItems,
  deleteItems
};
