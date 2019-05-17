import uuid from "uuid";
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from "./types";

type State = {
  items: []
};

const initialState: State = {
  items: [
    { id: uuid(), name: "Susu", count: 5 },
    { id: uuid(), name: "Telur", count: 10 },
    { id: uuid(), name: "Kacang", count: 3 }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state
        // ...action.payload
      };
    }
    case ADD_ITEMS: {
      return {
        ...state
        // ...action.payload
      };
    }
    case DELETE_ITEMS: {
      return {
        ...state
        // ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};
