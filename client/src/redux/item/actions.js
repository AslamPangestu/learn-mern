import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from "./types";

const getItems = () => {
  return {
    types: GET_ITEMS
    // payload: null
  };
};

export default {
  getItems
};
