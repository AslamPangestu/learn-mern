import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";

type State = {
  items: [],
  isLoading: Boolean
};

const initialState: State = {
  items: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      console.log("Reducer Item", action.payload);
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    }
    case ADD_ITEMS: {
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    }
    case DELETE_ITEMS: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    case ITEMS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
